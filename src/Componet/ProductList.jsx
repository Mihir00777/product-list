import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductList } from '../action/ProductAction'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, InputAdornment, Pagination, TextField, Typography, styled } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";
const CardActionsBox = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "center",
}));
const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const data = useSelector((state) => state?.ProductReducer?.productList?.products)
  const [searchQuery, setSearchQuery] = useState("");

  // For Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data?.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, searchQuery]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(getProductList())
  }, [dispatch])

  // For Bookmarks
  const [bookmark, setbookmark] = useState([]);
  console.log('bookmark----', bookmark)
  const addTobookmark = (movie) => {
    const movieExists = bookmark.some((item) => item.id === movie.id);
    if (!movieExists) {
      const updatedbookmark = [...bookmark, movie];
      setbookmark(updatedbookmark);
      localStorage.setItem("bookmark", JSON.stringify(updatedbookmark));
    }
  };
  useEffect(() => {
    const storedbookmark = localStorage.getItem("bookmark");
    if (storedbookmark) {
      setbookmark(JSON.parse(storedbookmark));
    }
  }, [currentPage, searchQuery]);

  return (
    <React.Fragment>
      <Box p={'5%'}>

        <h1>ProductList</h1>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          alignItems: "center",
        }}>
          <TextField
            label="Search here"
            value={searchQuery}
            className="mr-10"
            fullWidth
            size="small"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant='contained' onClick={() => navigate('/bookmark-list')} sx={{ marginLeft: '10px' }} >Bookmarks</Button>
        </Box>
        <Grid container spacing={2}>
          {
            currentItems?.map((data, ind) => {
              return (
                <Grid item xl={2} lg={3} md={4} xs={12} sm={6} key={ind}>
                  <Card>
                    <CardActionArea

                    >
                      <CardMedia
                        component="img"
                        height="280"
                        image={data?.thumbnail}
                        alt="green iguana"
                      />
                      <CardContent sx={{ minHeight: "80px" }}>
                        <Typography className="movie-title">
                          {data?.title}
                        </Typography>
                        <Typography component="div">
                          Price: {data?.price} $
                        </Typography>
                        <Typography component="div">
                          Brand: {data?.brand}
                        </Typography>
                        <Typography component="div">
                          Category: {data?.category}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActionsBox>
                      <Button
                        variant="contained"
                        onClick={() =>
                          addTobookmark(data)
                        }
                        disabled={bookmark.some(
                          (item) => item.id === data?.id
                        )}
                      >
                        Add to list
                      </Button>
                    </CardActionsBox>
                  </Card>
                </Grid>
              );
            })
          }

        </Grid>
        <Box display={'flex'} justifyContent={'end'} mt={2}>

          <Pagination
            count={Math.ceil(filteredData?.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </Box>

      </Box>
    </React.Fragment>
  )
}

export default ProductList