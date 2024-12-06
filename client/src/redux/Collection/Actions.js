import { api } from "../../config/apiUrl";
import { API_BASE_URL } from "../../config/apiUrl";
import { CREATE_COLLECTION_SUCCESS, CREATE_COLLECTION_FAILURE, CREATE_COLLECTION_REQUEST, GET_ALL_COLLECTION_REQUEST, GET_ALL_COLLECTION_FAILURE, GET_ALL_COLLECTION_SUCCESS, ADDRECIPE_COLLECTION_SUCCESS, ADDRECIPE_COLLECTION_FAILURE, ADDRECIPE_COLLECTION_REQUEST, DELETE_COLLECTION_FAILURE, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_REQUEST, UPDATE_COLLECTION_REQUEST, UPDATE_COLLECTION_SUCCESS, UPDATE_COLLECTION_FAILURE, FIND_COLLECTION_BY_ID_REQUEST, FIND_COLLECTION_BY_ID_SUCCESS, FIND_COLLECTION_BY_ID_FAILURE, REMOVE_RECIPE_COLLECTION_REQUEST, REMOVE_RECIPE_COLLECTION_SUCCESS, REMOVE_RECIPE_COLLECTION_FAILURE } from "./ActionTypes";

//CREATE COLLECTION 
export const createCollection = (recipeData) => async (dispatch) => {
    dispatch({ type: CREATE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.post(`${API_BASE_URL}/api/create-collection`, recipeData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        const data = res?.data;
        dispatch({
            type: CREATE_COLLECTION_SUCCESS,
            payload: data,
        });
        return data;
    } catch (error) {
        dispatch({
            type: CREATE_COLLECTION_FAILURE,
            payload: error.message,
        });

    }
};

//GET ALL COLLECTIONS
export const getAllCollections = () => async (dispatch) => {
    dispatch({ type: GET_ALL_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    console.log(jwt,"jwt")
    try {
        const res = await api.get(`${API_BASE_URL}/api/all-collection`,  {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        const data = res?.data;
        dispatch({
            type: GET_ALL_COLLECTION_SUCCESS,
            payload: data,
        });
        return data;
    } catch (error) {
        dispatch({
            type: GET_ALL_COLLECTION_FAILURE,
            payload: error.message,
        });
    }
};

//FIND COLLECTION BY ID
export const findCollectionById = (reqData, jwt) => async (dispatch) => {
    dispatch({ type: FIND_COLLECTION_BY_ID_REQUEST });
    const { collectionId } = reqData;
    try {
        const { data } = await api.get(`/api/collection-get/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: FIND_COLLECTION_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_COLLECTION_BY_ID_FAILURE, payload: error.message });
    }
};

//ADD RECIPE TO COLLECTION
export const addRecipeToCollection = (recipeData) => async (dispatch) => {
    dispatch({ type: ADDRECIPE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.post(`${API_BASE_URL}/api/add-recipe-collection`, recipeData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        const { updatedFavorites } = res?.data;
        dispatch({
            type: ADDRECIPE_COLLECTION_SUCCESS,
            payload: updatedFavorites,
        });
        dispatch(getAllCollections());
        return updatedFavorites;
    } catch (error) {
        dispatch({
            type: ADDRECIPE_COLLECTION_FAILURE,
            payload: error.message,
        });
    }
};


//DELETE COLLECTION
export const deleteCollection = (collectionId) => async (dispatch) => {
    dispatch({ type: DELETE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.delete(`${API_BASE_URL}/api/delete-collection/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`, 
            },
        });
        const data = res?.data;
        dispatch({
            type: DELETE_COLLECTION_SUCCESS,
            payload: data,
        });
        return data; 
    } catch (error) {
        const errorMessage =
            error.response?.data?.message || error.message || 'An error occurred';
        dispatch({
            type: DELETE_COLLECTION_FAILURE,
            payload: errorMessage,
        });
    }
};

//UPDATE COLLECTION
export const updateCollection = (collectionId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.put(
            `${API_BASE_URL}/api/update-collection/${collectionId}`,
            updatedData, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`, 
                },
            }
        );
        const data = res?.data;
        dispatch({
            type: UPDATE_COLLECTION_SUCCESS,
            payload: data, 
        });
        return data; 
    } catch (error) {
        dispatch({
            type: UPDATE_COLLECTION_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

//REMOVE RECIPE FROM COLLECTION
export const removeRecipeFromCollection = (collectionId, recipeId) => async (dispatch) => {
    dispatch({ type: REMOVE_RECIPE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.delete(
            `${API_BASE_URL}/api/collections/${collectionId}/recipes/${recipeId}`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`, // Include token for authentication
                },
            }
        );
        const data = res?.data;
        dispatch({
            type: REMOVE_RECIPE_COLLECTION_SUCCESS,
            payload: data.recipeId
        });
        return data; 
    } catch (error) {
        dispatch({
            type: REMOVE_RECIPE_COLLECTION_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

