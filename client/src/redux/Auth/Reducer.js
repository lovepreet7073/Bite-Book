import {
    REMOVE_FAVORITE_SUCCESS,
    REMOVE_FAVORITE_REQUEST,
    REMOVE_FAVORITE_FAILURE
} from "../Recipe/ActionTypes";
import {
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_FAILURE,
    GOOGLE_LOGIN_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    CHECK_TOKEN_VALIDITY_REQUEST,
    CHECK_TOKEN_VALIDITY_SUCCESS,
    CHECK_TOKEN_VALIDITY_FAILURE,
    FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE
} from "./ActionType";
import { ADDRECIPE_COLLECTION_SUCCESS } from "../Collection/ActionTypes";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    userFavorites: [],
    isTokenValid: null, // Add this to track token validity
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
        case UPDATE_USER_REQUEST:
        case REMOVE_FAVORITE_REQUEST:
        case CHECK_TOKEN_VALIDITY_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload };

        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                userFavorites: action.payload.favorites || [],
            };

        case UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };

        case ADDRECIPE_COLLECTION_SUCCESS:
            const updatedFavorites = action.payload;
            return {
                ...state,
                isLoading: false,
                userFavorites: updatedFavorites,
            };

        case REMOVE_FAVORITE_SUCCESS:
            const recipeIdToRemove = action.payload;
            return {
                ...state,
                userFavorites: state.userFavorites.filter(favorite => favorite._id !== recipeIdToRemove),
                isLoading: false,
            };

        case CHECK_TOKEN_VALIDITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isTokenValid: true,
            };

        case CHECK_TOKEN_VALIDITY_FAILURE:
            return {
                ...state,
                isLoading: false,
                isTokenValid: false,
                error: action.payload,
            };

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null, // Clear any error on success
            };

        case FORGOT_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload, // Set the error message from the action payload
            };

        case REGISTER_FAILURE:
        case UPDATE_USER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GOOGLE_LOGIN_FAILURE:
        case REMOVE_FAVORITE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload };

        case LOGOUT:
            return { ...initialState };

        default:
            return state;
    }
};

