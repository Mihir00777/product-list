import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, InputAdornment, Pagination, TextField, Typography, styled } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
const CardActionsBox = styled(CardActions)(() => ({
    display: "flex",
    justifyContent: "center",
}));
const BookMarkList = () => {
    const [bookmark, setbookmark] = useState([]);
    console.log('bookmark----', bookmark)

    const [searchQuery, setSearchQuery] = useState("");

    // For Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [filteredData, setFilteredData] = useState(bookmark);

    useEffect(() => {
        const filtered = bookmark?.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    }, [bookmark, searchQuery]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    // For bookmarks
    const removeFrombookmark = (movieId) => {
        const updatedbookmark = bookmark.filter((item) => item.id !== movieId);
        setbookmark(updatedbookmark);
        localStorage.setItem("bookmark", JSON.stringify(updatedbookmark));
    };
    const clearbookmark = () => {
        setbookmark([]);
        localStorage.removeItem("bookmark");
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
                    <Button
                        variant='outlined'
                        sx={{ marginLeft: '10px' }}
                        onClick={() => {
                            clearbookmark();
                        }}
                    >
                        Clear
                    </Button>
                </Box>
                <Grid container spacing={2}>
                    {currentItems?.length ? <>
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
                                                        removeFrombookmark(data?.id)
                                                    }
                                                >
                                                    Remove
                                                </Button>
                                            </CardActionsBox>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                    </> :
                        <>
                            <Grid item xl={2} lg={3} md={4} xs={12} sm={6}>

                                <h3>Please Add bookmark first.</h3>
                            </Grid>

                        </>

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

export default BookMarkList