import { GET_PRODUCT_LIST_ERROR, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS } from '../action/ProductAction'

const initialState ={
    productList: [],
    loading: true,
    error: '',
}

const ProductReducer = (state = initialState , action) => {
  switch(action.type){
    case  GET_PRODUCT_LIST_REQUEST:
        return { ...state , loading : true}
    case GET_PRODUCT_LIST_SUCCESS :
        return{ 
            ...state,
            productList: action.payload,
            loading: false
        }
        case GET_PRODUCT_LIST_ERROR :
            return{
                ...state,
                error: action.payload,
                loading: false
            }
            default:
           return{ ...state};

  }
}

export default ProductReducer