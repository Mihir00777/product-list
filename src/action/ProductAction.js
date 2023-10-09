import axios from "axios"

export const GET_PRODUCT_LIST_REQUEST = 'GET_PRODUCT_LIST_REQUEST'
export const GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS'
export const GET_PRODUCT_LIST_ERROR = 'GET_PRODUCT_LIST_ERROR'


export const getProductList = () =>{
   return async(dispatch) => {
    dispatch({type: GET_PRODUCT_LIST_REQUEST})
    try{
        const response = await axios.get('https://dummyjson.com/products/')
        const getData = response.data;
        dispatch({type: GET_PRODUCT_LIST_SUCCESS, payload: getData })

    }catch(error){
        dispatch({type: GET_PRODUCT_LIST_ERROR , payload: error.message})
    }
}
}