import { api } from "../../config/apiUrl";
import { API_BASE_URL } from "../../config/apiUrl";
import { CREATE_COLLECTION_SUCCESS, CREATE_COLLECTION_FAILURE, CREATE_COLLECTION_REQUEST, GET_ALL_COLLECTION_REQUEST, GET_ALL_COLLECTION_FAILURE, GET_ALL_COLLECTION_SUCCESS } from "./ActionTypes";

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
        }); s
        return data; // Return data if successful-+
    } catch (error) {
        dispatch({
            type: GET_ALL_COLLECTION_FAILURE,
            payload: error.message,
        });

    }
};