import { api } from "../../config/apiUrl"
import { ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS } from "./ActionTypes"
import { API_BASE_URL } from "../../config/apiUrl"

export const addRecipe = (recipeData) => async (dispatch) => {
    dispatch({ type: ADD_RECIPE_REQUEST })
    console.log('inside-addrecipe',recipeData)
    try {
        const res = await api.post(`${API_BASE_URL}/api/add-recipe`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        console.log(res, "res")
        const data = res?.data;


        dispatch({
            type: ADD_RECIPE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADD_RECIPE_FAILURE,
            payload: error.response ? error.response.data : error.message
        })
    }
}



export const GetRecipes = () => async (dispatch) => {
    dispatch({ type: FIND_RECIPES_REQUEST });

    try {
        // Make the API request to get all recipes
        const { data } = await api.get('/api/all-recipes');

        // Dispatch success action with the data payload
        dispatch({
            type: FIND_RECIPES_SUCCESS,
            payload: data
        });
    } catch (error) {
        // Dispatch failure action if an error occurs
        dispatch({
            type: FIND_RECIPES_FAILURE,
            payload: error.message || 'An error occurred while fetching recipes.'
        });
    }
};

export const findRecipeById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_RECIPE_BY_ID_REQUEST })

    const { recipeId } = reqData;

    try {
        const { data } = await api.get(`/api/recipe-get/${recipeId}`)
        dispatch({ type: FIND_RECIPE_BY_ID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: FIND_RECIPE_BY_ID_FAILURE, payload: error.message })
    }
}