import { api } from "../../config/apiUrl";
import {
  ADD_RECIPE_FAILURE,
  ADD_RECIPE_REQUEST,
  ADD_RECIPE_SUCCESS,
  FIND_RECIPE_BY_ID_FAILURE,
  FIND_RECIPE_BY_ID_REQUEST,
  FIND_RECIPE_BY_ID_SUCCESS,
  FIND_RECIPES_FAILURE,
  FIND_RECIPES_REQUEST,
  FIND_RECIPES_SUCCESS,

  USER_RECIPES_FAILURE,
  USER_RECIPES_REQUEST,
  USER_RECIPES_SUCCESS,
  DELETE_RECIPE_FAILURE,
  DELETE_RECIPE_REQUEST,
  DELETE_RECIPE_SUCCESS,
  UPDATE_RECIPE_REQUEST,
  UPDATE_RECIPE_SUCCESS,
  UPDATE_RECIPE_FAILURE,
  POST_REVIEW_FAILURE,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_SUCCESS, REMOVE_FAVORITE_FAILURE,
  UPDATE_REVIEW_REQUEST,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAILURE,
  FETCH_POPULAR_RECIPES_REQUEST,
  FETCH_POPULAR_RECIPES_SUCCESS,
  FETCH_POPULAR_RECIPES_FAILURE
} from "./ActionTypes";
import { API_BASE_URL } from "../../config/apiUrl";
export const addRecipe = (recipeData, navigate) => async (dispatch) => {
  dispatch({ type: ADD_RECIPE_REQUEST });
  const jwt = localStorage.getItem("jwt"); // Get the latest token from localStorage

  try {
    const res = await api.post(`${API_BASE_URL}/api/add-recipe`, recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`, // Set the token dynamically
      },
    });

    const data = res?.data;
    dispatch({
      type: ADD_RECIPE_SUCCESS,
      payload: data,
    });
    dispatch(GetRecipes());
    return data; // Return data if successful-+
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

    console.log("Filtered Params:", filteredParams); // Debug: check if filters are being correctly passed

    // Make the API request with query parameters for filtering
    const { data } = await api.get(`/api/all-recipes?${queryString}`);

    // Dispatch success action with the data payload
    dispatch({
      type: FIND_RECIPES_SUCCESS,
      payload: data,
    });
    console.log(data, "data-GetRecipes");
  } catch (error) {
    // Dispatch failure action if an error occurs
    dispatch({
      type: FIND_RECIPES_FAILURE,
      payload: error.message || "An error occurred while fetching recipes.",
    });
  }
};

export const findRecipeById = (reqData, jwt) => async (dispatch) => {
  dispatch({ type: FIND_RECIPE_BY_ID_REQUEST });

  const { recipeId } = reqData;

  try {
    const { data } = await api.get(`/api/recipe-get/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({ type: FIND_RECIPE_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_RECIPE_BY_ID_FAILURE, payload: error.message });
  }
};

export const userRecipes = (userId, jwt) => async (dispatch) => {
  dispatch({ type: USER_RECIPES_REQUEST });

  try {
    const { data } = await api.get(`/api/user-recipe-get/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log(data, "data-user-recipes")
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
    const { data } = await api.delete(`/api/delete-recipe/${recipeId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`, // Set the token dynamically
      },
    });

    dispatch({ type: DELETE_RECIPE_SUCCESS, payload: data.recipeId });
  } catch (error) {
    dispatch({
      type: DELETE_RECIPE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};




export const UpdateRecipe = (recipeId, formData) => async (dispatch) => {
  dispatch({ type: UPDATE_RECIPE_REQUEST });
  const jwt = localStorage.getItem("jwt");
  try {
    // Send the formData in the PUT request
    const { data } = await api.put(`/api/update-recipe/${recipeId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`, // Set the token dynamically
      },
    });


    dispatch({ type: UPDATE_RECIPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_RECIPE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const ReviewOnRecipe = (recipeId, rating, comment) => async (dispatch) => {
  dispatch({ type: POST_REVIEW_REQUEST });
  const jwt = localStorage.getItem("jwt");

  try {
    // Make a POST request to submit the review
    const { data } = await api.post(
      `/api/rate-recipe/${recipeId}`,
      { rating, comment }, // Send rating and comment in the request body
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include the token in headers
        },
      }
    );

    dispatch({ type: POST_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_REVIEW_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const RemoveRecipeFavorites = (recipeId) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITE_REQUEST });
  const jwt = localStorage.getItem("jwt");

  try {
    const { data } = await api.delete(`/api/remove-favorites/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`, // Use the auth token for authorization
      },
    });


    dispatch({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: data.recipeId
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVORITE_FAILURE,
      payload: error.message || 'Server error',
    });
  }
};


export const UpdateReview = ({ recipeId, rating, comment, reviewId }) => async (dispatch) => {
  dispatch({ type: UPDATE_REVIEW_REQUEST });
  const jwt = localStorage.getItem("jwt");

  try {
    // Make a PUT request to update the review
    const { data } = await api.put(
      `/api/update-review/${recipeId}/${reviewId}`, // Ensure that both recipeId and reviewId are passed correctly in the URL
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${jwt}`, // Include JWT token in the header for authorization
        },
      }
    );

    // Dispatch success action with updated recipe and review
    dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });

  } catch (error) {
    dispatch({
      type: UPDATE_REVIEW_FAILURE,
      payload: error.message,
    });
  }
};


export const fetchPopularRecipes = (limit = 10) => async (dispatch) => {
  dispatch({ type: FETCH_POPULAR_RECIPES_REQUEST });

  try {
    const { data } = await api.get(`/api/popular-recipes?limit=${limit}`);
    dispatch({
      type: FETCH_POPULAR_RECIPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_POPULAR_RECIPES_FAILURE,
      payload: error.message,
    });
  }
};