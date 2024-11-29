import { api } from "../../config/apiUrl";
import { API_BASE_URL } from "../../config/apiUrl";
import { CREATE_COLLECTION_SUCCESS, CREATE_COLLECTION_FAILURE, CREATE_COLLECTION_REQUEST, GET_ALL_COLLECTION_REQUEST, GET_ALL_COLLECTION_FAILURE, GET_ALL_COLLECTION_SUCCESS, ADDRECIPE_COLLECTION_SUCCESS, ADDRECIPE_COLLECTION_FAILURE, ADDRECIPE_COLLECTION_REQUEST, DELETE_COLLECTION_FAILURE, DELETE_COLLECTION_SUCCESS, DELETE_COLLECTION_REQUEST, UPDATE_COLLECTION_REQUEST, UPDATE_COLLECTION_SUCCESS, UPDATE_COLLECTION_FAILURE } from "./ActionTypes";

export const createCollection = (recipeData) => async (dispatch) => {
    dispatch({ type: CREATE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");

    try {
        const res = await api.post(`${API_BASE_URL}/api/create-collection`, recipeData, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Set the token dynamically
            },
        });

        const data = res?.data;
        dispatch({
            type: CREATE_COLLECTION_SUCCESS,
            payload: data,
        });
        return data; // Return data if successful-+
    } catch (error) {
        dispatch({
            type: CREATE_COLLECTION_FAILURE,
            payload: error.message,
        });

    }
};

export const getAllCollections = (recipeData) => async (dispatch) => {
    dispatch({ type: GET_ALL_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const res = await api.get(`${API_BASE_URL}/api/all-collection`, recipeData, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Set the token dynamically
            },
        });

        const data = res?.data;
        dispatch({
            type: GET_ALL_COLLECTION_SUCCESS,
            payload: data,
        }); 
        return data; // Return data if successful-+
    } catch (error) {
        dispatch({
            type: GET_ALL_COLLECTION_FAILURE,
            payload: error.message,
        });

    }
};

export const addRecipeToCollection = (recipeData) => async (dispatch) => {
    dispatch({ type: ADDRECIPE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");

    try {
        const res = await api.post(`${API_BASE_URL}/api/add-recipe-collection`, recipeData, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        const { updatedFavorites, message } = res?.data; // Assuming the API response returns updatedFavorites

        // Dispatch success action with updated favorites
        dispatch({
            type: ADDRECIPE_COLLECTION_SUCCESS,
            payload: updatedFavorites, // Pass updatedFavorites
        });
        dispatch(getAllCollections()); // Get updated collections as well

        return updatedFavorites; // Return updated favorites
    } catch (error) {
        dispatch({
            type: ADDRECIPE_COLLECTION_FAILURE,
            payload: error.message,
        });
    }
};

export const deleteCollection = (collectionId) => async (dispatch) => {
    dispatch({ type: DELETE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");

    try {
        const res = await api.delete(`${API_BASE_URL}/api/delete-collection/${collectionId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`, // Include token for authentication
            },
        });

        const data = res?.data;

        dispatch({
            type: DELETE_COLLECTION_SUCCESS,
            payload: data,
        });

        return data; // Return data if successful
    } catch (error) {
        // Handle error response
        const errorMessage =
            error.response?.data?.message || error.message || 'An error occurred';

        dispatch({
            type: DELETE_COLLECTION_FAILURE,
            payload: errorMessage,
        });

        throw new Error(errorMessage); // Throw error for further handling if needed
    }
};


export const updateCollection = (collectionId, updatedData) => async (dispatch) => {
    dispatch({ type: UPDATE_COLLECTION_REQUEST });
    const jwt = localStorage.getItem("jwt");

    try {
        const res = await api.put(
            `${API_BASE_URL}/api/update-collection/${collectionId}`,
            updatedData, // Pass updated data in the request body
            {
                headers: {
                    Authorization: `Bearer ${jwt}`, // Include token for authentication
                },
            }
        );
        const data = res?.data;

        dispatch({
            type: UPDATE_COLLECTION_SUCCESS,
            payload: data, // The updated collection
        });
        
        return data; // Return data if successful
    } catch (error) {
        dispatch({
            type: UPDATE_COLLECTION_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};