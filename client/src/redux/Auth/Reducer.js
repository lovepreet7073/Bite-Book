import { REMOVE_FAVORITE_SUCCESS, REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_FAILURE } from "../Recipe/ActionTypes"
import { LOGIN_FAILURE, LOGIN_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_SUCCESS, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from "./ActionType"
import { ADDRECIPE_COLLECTION_SUCCESS } from "../Collection/ActionTypes"
const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    userFavorites: [],
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
        case UPDATE_USER_REQUEST:
        case REMOVE_FAVORITE_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                userFavorites: action.payload.favorites || [],  // Set favorites from user object
            };
        case UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case ADDRECIPE_COLLECTION_SUCCESS:
            const updatedFavorites = action.payload; // Assuming the response includes the updated favorites
            return {
                ...state,
                isLoading: false,
                userFavorites: updatedFavorites, // Update the favorites list in the state
            };
        case REMOVE_FAVORITE_SUCCESS:
            const recipeIdToRemove = action.payload;
            { console.log(action.payload, "action.payload") }
            { console.log(recipeIdToRemove, "payload") } // Get the recipeId from the payload
            return {
                ...state,
                userFavorites: state.userFavorites.filter(favorite => favorite._id !== recipeIdToRemove),
                isLoading: false // 
            };


        case REGISTER_FAILURE:
        case UPDATE_USER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GOOGLE_LOGIN_FAILURE:
        case REMOVE_FAVORITE_FAILURE:
            { console.log(action.payload, "action.payload ") }
            return { ...state, isLoading: false, error: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case LOGOUT:
            return { ...initialState }

        default:
            return state;
    }
}