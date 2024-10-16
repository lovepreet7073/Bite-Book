import { ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS } from "./ActionTypes"
const initialState = {
    recipe: null,
    isLoading: false,
    error: null,
    allRecipes: null
}

export const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPE_REQUEST:
        case FIND_RECIPES_REQUEST:
        case FIND_RECIPE_BY_ID_REQUEST:
            return { ...state, isLoading: true, error: null }
        case ADD_RECIPE_SUCCESS:
            return { ...state, isLoading: false, error: null, recipe: action.payload }
        case FIND_RECIPE_BY_ID_SUCCESS:
            return { ...state, isLoading: false, error: null, recipe: action.payload }
        case FIND_RECIPES_SUCCESS:
            return { ...state, isLoading: false, error: null, allRecipes: action.payload }
        case ADD_RECIPE_FAILURE:
        case FIND_RECIPES_FAILURE:
        case FIND_RECIPE_BY_ID_FAILURE:
            return { ...state, isLoading: false, error: action.payload }


        default:
            return state;
    }
}