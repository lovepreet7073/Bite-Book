import { api } from "../../config/apiUrl";
import {
  ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS, USER_RECIPES_FAILURE, USER_RECIPES_REQUEST, USER_RECIPES_SUCCESS, DELETE_RECIPE_FAILURE, DELETE_RECIPE_REQUEST, DELETE_RECIPE_SUCCESS, UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, UPDATE_RECIPE_FAILURE,
   REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_SUCCESS, REMOVE_FAVORITE_FAILURE,
   FETCH_POPULAR_RECIPES_REQUEST, FETCH_POPULAR_RECIPES_SUCCESS, FETCH_POPULAR_RECIPES_FAILURE
} from "./ActionTypes";
import { API_BASE_URL } from "../../config/apiUrl";

//ADD RECIPE ACTION
export const addRecipe = (recipeData) => async (dispatch) => {
  dispatch({ type: ADD_RECIPE_REQUEST });
  const jwt = localStorage.getItem("jwt");
  try {
    const res = await api.post(`${API_BASE_URL}/api/add-recipe`, recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${jwt}`,
      },
    });
    const data = res?.data;
    dispatch({
      type: ADD_RECIPE_SUCCESS,
      payload: data,
    });
    dispatch(GetRecipes());
    return data;
  } catch (error) {
    dispatch({
      type: ADD_RECIPE_FAILURE,
      payload: error.message || "An error occurred while fetching recipes.",
    });
  }
};


//GET RECIPES
export const GetRecipes = (filters) => async (dispatch) => {
  dispatch({ type: FIND_RECIPES_REQUEST });
  try {
    const filteredParams = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => value)
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const { data } = await api.get(`/api/all-recipes?${queryString}`);
    dispatch({
      type: FIND_RECIPES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_RECIPES_FAILURE,
      payload: error.message || "An error occurred while fetching recipes.",
    });
  }
};


//FIND RECIPE BY ID
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

//USER RECIPES
export const userRecipes = (userId, jwt) => async (dispatch) => {
  dispatch({ type: USER_RECIPES_REQUEST });
  try {
    const { data } = await api.get(`/api/user-recipe-get/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
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

//UPDATE RECIPE
export const UpdateRecipe = (recipeId, formData) => async (dispatch) => {
  dispatch({ type: UPDATE_RECIPE_REQUEST });
  const jwt = localStorage.getItem("jwt");
  try {
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
      payload: error.message,
    });
  }
};


//REMOVE RECIPE FROM SAVED
export const RemoveRecipeFavorites = (recipeId) => async (dispatch) => {
  dispatch({ type: REMOVE_FAVORITE_REQUEST });
  const jwt = localStorage.getItem("jwt");
  try {
    const { data } = await api.delete(`/api/remove-favorites/${recipeId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
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

// //UPDATE REVIEW


//GET POPULAR RECIPES
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