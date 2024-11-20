import { CREATE_COLLECTION_FAILURE, CREATE_COLLECTION_REQUEST, CREATE_COLLECTION_SUCCESS, GET_ALL_COLLECTION_REQUEST,
    GET_ALL_COLLECTION_SUCCESS,
    GET_ALL_COLLECTION_FAILURE } from "./ActionTypes"
const initialState = {
    isLoading: false,
    error: null,
    collection: [],
    allCollection:[]
}

export const collectionReducer = (state = initialState, action) => {
    switch (action.type) {
        // Case for creating a collection
        case CREATE_COLLECTION_REQUEST:
          return { ...state, isLoading: true, error: null };
    
        case CREATE_COLLECTION_SUCCESS:
          return { ...state, isLoading: false, collection: action.payload };
    
        case CREATE_COLLECTION_FAILURE:
          return { ...state, isLoading: false, error: action.payload };
    
        // Case for getting all collections
        case GET_ALL_COLLECTION_REQUEST:
          return { ...state, isLoading: true, error: null };
    
        case GET_ALL_COLLECTION_SUCCESS:
          return { ...state, isLoading: false, allCollection: action.payload };
    
        case GET_ALL_COLLECTION_FAILURE:
          return { ...state, isLoading: false, error: action.payload };
    
        default:
          return state;
      }
    };