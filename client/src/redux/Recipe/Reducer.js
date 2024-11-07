import { ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS, RECIPE_LIKE_FAILURE, RECIPE_LIKE_REQUEST, USER_RECIPES_FAILURE, USER_RECIPES_REQUEST, USER_RECIPES_SUCCESS, RECIPE_LIKE_SUCCESS, DELETE_RECIPE_REQUEST, DELETE_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS, UPDATE_RECIPE_FAILURE, UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, POST_REVIEW_REQUEST, POST_REVIEW_FAILURE ,POST_REVIEW_SUCCESS} from "./ActionTypes"
const initialState = {
    recipe: null,
    isLoading: false,
    error: null,
    allRecipes: null,
    userRecipes: []

}

export const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPE_REQUEST:
        case RECIPE_LIKE_REQUEST:
        case FIND_RECIPES_REQUEST:
        case FIND_RECIPE_BY_ID_REQUEST:
        case USER_RECIPES_REQUEST:
        case DELETE_RECIPE_REQUEST:
        case POST_REVIEW_REQUEST:
        case UPDATE_RECIPE_REQUEST:
            return { ...state, isLoading: true, error: null }
        case DELETE_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                deletedRecipe: action.payload,
                // Remove the deleted recipe from userRecipes
                userRecipes: state.userRecipes ? state.userRecipes.filter(recipe => recipe._id !== action.payload._id) : null
            };
        case ADD_RECIPE_SUCCESS:
            return { ...state, isLoading: false, error: null, recipe: action.payload.recipe, allRecipes: [...state.allRecipes, action.payload.recipe] }
        case FIND_RECIPE_BY_ID_SUCCESS:
            return { ...state, isLoading: false, error: null, recipe: action.payload }
        case FIND_RECIPES_SUCCESS:
            return { ...state, isLoading: false, error: null, allRecipes: action.payload }
        case USER_RECIPES_SUCCESS:
            return { ...state, isLoading: false, error: null, userRecipes: action.payload }
        case RECIPE_LIKE_SUCCESS: {
            const updatedRecipe = action.payload; // The updated recipe from the server response
            return {
                ...state,
                isLoading: false,
                error: null,
                allRecipes: state.allRecipes ? state.allRecipes.map(recipe =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                ) : null,
                recipe: state.recipe && state.recipe._id === updatedRecipe._id ? updatedRecipe : state.recipe,
            };
        }
        case UPDATE_RECIPE_SUCCESS:
            return {
                ...state,
                updatedRecipe: action.payload,
                loading: false,
            }
        case POST_REVIEW_SUCCESS:
            console.log(action.payload,"action.payload")

            return {
                ...state,
                isLoading: false,
                error: null,
                recipe: {
                    ...state.recipe,
                    reviews: [...(state.recipe?.reviews || []), action.payload] 
                }

            };

        case ADD_RECIPE_FAILURE:
        case FIND_RECIPES_FAILURE:
        case FIND_RECIPE_BY_ID_FAILURE:
        case USER_RECIPES_FAILURE:
        case RECIPE_LIKE_FAILURE:
        case DELETE_RECIPE_FAILURE:
        case UPDATE_RECIPE_FAILURE:
        case POST_REVIEW_FAILURE:
            return { ...state, isLoading: false, error: action.payload }


        default:
            return state;
    }
}