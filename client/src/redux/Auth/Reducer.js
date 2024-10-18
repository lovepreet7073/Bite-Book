import { LOGIN_FAILURE, LOGIN_REQUEST, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_SUCCESS,UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, } from "./ActionType"
const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case GOOGLE_LOGIN_REQUEST:
            case UPDATE_USER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case REGISTER_SUCCESS:
        case GOOGLE_LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case GET_USER_SUCCESS:
            case UPDATE_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload }
        case REGISTER_FAILURE:
            case UPDATE_USER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case GOOGLE_LOGIN_FAILURE:
            {console.log(action.payload ,"action.payload ")}
            return { ...state, isLoading: false, error: action.payload }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload }
        case LOGOUT:
            return { ...initialState }

        default:
            return state;
    }
}