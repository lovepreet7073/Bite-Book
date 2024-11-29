import {
    ADD_RECIPE_FAILURE, ADD_RECIPE_REQUEST, ADD_RECIPE_SUCCESS, FIND_RECIPE_BY_ID_FAILURE, FIND_RECIPE_BY_ID_REQUEST, FIND_RECIPE_BY_ID_SUCCESS, FIND_RECIPES_FAILURE, FIND_RECIPES_REQUEST, FIND_RECIPES_SUCCESS,  USER_RECIPES_FAILURE, USER_RECIPES_REQUEST, USER_RECIPES_SUCCESS, DELETE_RECIPE_REQUEST, DELETE_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS, UPDATE_RECIPE_FAILURE, UPDATE_RECIPE_REQUEST, UPDATE_RECIPE_SUCCESS, POST_REVIEW_REQUEST, POST_REVIEW_FAILURE, POST_REVIEW_SUCCESS, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_FAILURE, FETCH_POPULAR_RECIPES_REQUEST,
    FETCH_POPULAR_RECIPES_SUCCESS,
    FETCH_POPULAR_RECIPES_FAILURE
} from "./ActionTypes"
const initialState = {
    recipe: null,
    isLoading: false,
    error: null,
    allRecipes: null,
    userRecipes: [],
    popularRecipes: []

}

export const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPE_REQUEST:
        case UPDATE_REVIEW_REQUEST:
        case FETCH_POPULAR_RECIPES_REQUEST:
        case FIND_RECIPES_REQUEST:
        case FIND_RECIPE_BY_ID_REQUEST:
        case USER_RECIPES_REQUEST:
        case DELETE_RECIPE_REQUEST:
        case POST_REVIEW_REQUEST:
        case UPDATE_RECIPE_REQUEST:
            return { ...state, isLoading: true, error: null }
        case DELETE_RECIPE_SUCCESS:
            console.log(action.payload, "action-pyalod")
            return {
                ...state,
                isLoading: false,
                deletedRecipe: action.payload,  // recipeId
                allRecipes: state.allRecipes ? state.allRecipes.filter(recipe => recipe._id !== action.payload) : null,
                userRecipes: state.userRecipes ? state.userRecipes.filter(recipe => recipe._id !== action.payload) : null,
            };

        case ADD_RECIPE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                recipe: action.payload.recipe,
                allRecipes: [action.payload.recipe, ...state.allRecipes] // Add the new recipe at the beginning
            };

        case FIND_RECIPE_BY_ID_SUCCESS:
            return { ...state, isLoading: false, error: null, recipe: action.payload }
        case FIND_RECIPES_SUCCESS:
            return { ...state, isLoading: false, error: null, allRecipes: action.payload }
        case USER_RECIPES_SUCCESS:
            return { ...state, isLoading: false, error: null, userRecipes: action.payload }
  
        case UPDATE_RECIPE_SUCCESS:
            const updatedRecipe = action.payload
            console.log(action.payload, "action-payload")

            return {
                ...state,
                isLoading: false,
                error: null,
                recipe: updatedRecipe,  // Ensure the updated reviews are added to the recipe
                allRecipes: state.allRecipes ? state.allRecipes.map(recipe =>
                    recipe._id === updatedRecipe._id ? updatedRecipe : recipe
                ) : null,
            };
        case POST_REVIEW_SUCCESS:
            const { recipe, reviews } = action.payload;
            return {
                ...state,
                isLoading: false,
                error: null,
                recipe: { ...recipe, reviews },  // Ensure the updated reviews are added to the recipe
                allRecipes: state.allRecipes.map((r) =>
                    r._id === recipe._id ? { ...r, reviews } : r  // Ensure the updated reviews are added to allRecipes
                ),
            };
            case UPDATE_REVIEW_SUCCESS: {
                const { recipe, review } = action.payload;
                console.log(action.payload, "payload");
            
                return {
                    ...state,
                    isLoading: false,
                    error: null,
                    // Update the main recipe with the new review at the top
                    recipe: {
                        ...state.recipe,
                        ...recipe,
                        reviews: [
                            review, // Place the updated review first
                            ...state.recipe.reviews.filter((r) => r._id !== review._id), // Add the rest of the reviews
                        ]
                    },
                    // Update the specific recipe in the allRecipes array with the updated review
                    allRecipes: state.allRecipes.map((r) =>
                        r._id === recipe._id
                            ? {
                                ...r,
                                reviews: [
                                    review, // Place the updated review first
                                    ...r.reviews.filter((rev) => rev._id !== review._id), // Add the rest of the reviews
                                ]
                            }
                            : r
                    ),
                };
            }
            


        case FETCH_POPULAR_RECIPES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                popularRecipes: action.payload  // Save the popular recipes in state
            };
        case ADD_RECIPE_FAILURE:
        case FETCH_POPULAR_RECIPES_FAILURE:
        case FIND_RECIPES_FAILURE:
        case FIND_RECIPE_BY_ID_FAILURE:
        case USER_RECIPES_FAILURE:
        case DELETE_RECIPE_FAILURE:
        case UPDATE_RECIPE_FAILURE:
        case POST_REVIEW_FAILURE:
        case UPDATE_REVIEW_FAILURE:
            return { ...state, isLoading: false, error: action.payload }


        default:
            return state;
    }
}