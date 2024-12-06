import {
  CREATE_COLLECTION_FAILURE,
  CREATE_COLLECTION_REQUEST,
  CREATE_COLLECTION_SUCCESS,
  GET_ALL_COLLECTION_REQUEST,
  GET_ALL_COLLECTION_SUCCESS,
  ADDRECIPE_COLLECTION_REQUEST,
  ADDRECIPE_COLLECTION_FAILURE,
  ADDRECIPE_COLLECTION_SUCCESS,
  GET_ALL_COLLECTION_FAILURE,
  DELETE_COLLECTION_REQUEST,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAILURE,
  UPDATE_COLLECTION_REQUEST,
  UPDATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_FAILURE,
  FIND_COLLECTION_BY_ID_REQUEST,
  FIND_COLLECTION_BY_ID_FAILURE,
  FIND_COLLECTION_BY_ID_SUCCESS,
  REMOVE_RECIPE_COLLECTION_REQUEST,
  REMOVE_RECIPE_COLLECTION_SUCCESS,
  REMOVE_RECIPE_COLLECTION_FAILURE,
} from "./ActionTypes";

const initialState = {
  isLoading: false,
  error: null,
  collection: [],
  allCollection: [],
};

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COLLECTION_REQUEST:
    case ADDRECIPE_COLLECTION_REQUEST:
    case UPDATE_COLLECTION_REQUEST:
    case FIND_COLLECTION_BY_ID_REQUEST:
      return { ...state, isLoading: true, error: null };
    case CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collection: action.payload,
        allCollection: [...state.allCollection, action.payload],
      };
    case CREATE_COLLECTION_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_ALL_COLLECTION_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GET_ALL_COLLECTION_SUCCESS:
      return { ...state, isLoading: false, allCollection: action.payload };
    case GET_ALL_COLLECTION_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case ADDRECIPE_COLLECTION_SUCCESS:
      console.log(action.payload, "action.payload");
      return {
        ...state,
        isLoading: false,
        allCollection: action.payload, // Update the collections with the new data
      };
    case FIND_COLLECTION_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        collection: action.payload,
      };
    case ADDRECIPE_COLLECTION_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_COLLECTION_REQUEST:
      return { ...state, isLoading: true, error: null };
    case DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        allCollection: state.allCollection.filter(
          (collection) => collection._id !== action.payload
        ),
      };
    case UPDATE_COLLECTION_SUCCESS:
      const updated = action.payload.data;
      return {
        ...state,
        isLoading: false,
        error: null,
        collection: updated, // Update the current collection details
        allCollection: state.allCollection
          ? state.allCollection.map((col) =>
            col._id === updated._id ? updated : col
          )
          : null, // Map over allCollection and replace the updated collection
      };


    case UPDATE_COLLECTION_FAILURE:
    case DELETE_COLLECTION_FAILURE:
    case FIND_COLLECTION_BY_ID_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case REMOVE_RECIPE_COLLECTION_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REMOVE_RECIPE_COLLECTION_SUCCESS:
      const recipeIdToRemove = action.payload;
      console.log(action.payload, "action.payload");
      console.log(recipeIdToRemove, "payload");
      return {
        ...state,
        collection: {
          ...state.collection,
          recipes: state.collection.recipes.filter((rec) => rec._id !== recipeIdToRemove),
        },
        allCollection: state.allCollection.map((collection) => ({
          ...collection,
          recipes: collection.recipes.filter((rec) => rec._id !== recipeIdToRemove),
        })),
        isLoading: false,
      };

    case REMOVE_RECIPE_COLLECTION_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
