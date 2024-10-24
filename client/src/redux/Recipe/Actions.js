import { api } from "../../config/apiUrl"
import { ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS, RECIPE_LIKE_FAILURE, RECIPE_LIKE_REQUEST, RECIPE_LIKE_SUCCESS, USER_RECIPES_FAILURE, USER_RECIPES_REQUEST, USER_RECIPES_SUCCESS, DELETE_RECIPE_FAILURE, DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_FAILURE } from "./ActionTypes"
import { API_BASE_URL } from "../../config/apiUrl"

export const addRecipe = (recipeData, navigate) => async (dispatch) => {
    dispatch({ type: ADD_RECIPE_REQUEST });
    const jwt = localStorage.getItem("jwt"); // Get the latest token from localStorage

    try {
        const res = await api.post(`${API_BASE_URL}/api/add-recipe`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${jwt}` // Set the token dynamically
            }
        });

        const data = res?.data;
        dispatch({
            type: ADD_RECIPE_SUCCESS,
            payload: data,
        });

        return data; // Return data if successful
    } catch (error) {
        dispatch({
            type: ADD_RECIPE_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });

        return { error: error.message }; // Return error
    }
};




export const GetRecipes = (filters) => async (dispatch) => {
    dispatch({ type: FIND_RECIPES_REQUEST });

    try {
        // Remove filters with empty values (filters that are falsy like "", null, etc.)
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([key, value]) => value) // Remove empty values
        );

        // Create query string based on filters
        const queryString = new URLSearchParams(filteredParams).toString();

        console.log('Filtered Params:', filteredParams);  // Debug: check if filters are being correctly passed

        // Make the API request with query parameters for filtering
        const { data } = await api.get(`/api/all-recipes?${queryString}`);

        // Dispatch success action with the data payload
        dispatch({
            type: FIND_RECIPES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({
            type: FIND_RECIPES_FAILURE,
            payload: error.message || "An error occurred while fetching recipes.",
        });
    }
};


export const findRecipeById = (reqData, jwt) => async (dispatch) => {
    dispatch({ type: FIND_RECIPE_BY_ID_REQUEST })

    const { recipeId } = reqData;

    try {
        const { data } = await api.get(`/api/recipe-get/${recipeId}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        }

        )
        dispatch({ type: FIND_RECIPE_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_RECIPE_BY_ID_FAILURE, payload: error.message })
    }
}


export const userRecipes = (userId, jwt) => async (dispatch) => {
    dispatch({ type: USER_RECIPES_REQUEST });

    try {
        const { data } = await api.get(`/api/user-recipe-get/${userId}`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        dispatch({ type: USER_RECIPES_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: USER_RECIPES_FAILURE, payload: error.message });
    }
};


export const DeleteRecipe = (recipeId) => async (dispatch) => {
    dispatch({ type: DELETE_RECIPE_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        // Use DELETE method instead of GET
        const { data } = await api.delete(`/api/delete-recipe/${recipeId}`,
            {
                headers: {
                    'Authorization': `Bearer ${jwt}` // Set the token dynamically
                }

            }
        );

        dispatch({ type: DELETE_RECIPE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_RECIPE_FAILURE, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};




export const likeRecipe = (recipeId, userId) => async (dispatch) => {
    dispatch({ type: RECIPE_LIKE_REQUEST })
    console.log('inside-addrecipe', recipeId, userId)
    try {
        const res = await api.post(`${API_BASE_URL}/api/user-recipe-like/${recipeId}/${userId}`)
        console.log(res, "res")
        const data = res?.data;


        dispatch({
            type: RECIPE_LIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RECIPE_LIKE_FAILURE,
            payload: error.response ? error.response.data : error.message
        })
    }
}

export const UpdateRecipe = (recipeId, formData) => async (dispatch) => {
    dispatch({ type: UPDATE_RECIPE_REQUEST });

    try {
        // Send the formData in the PUT request
        const { data } = await api.put(`/api/update-recipe/${recipeId}`, formData);

        dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_RECIPE_FAILURE,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};