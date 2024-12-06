import { API_BASE_URL } from '../../config/apiUrl';
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS,
    UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    CHECK_TOKEN_VALIDITY_REQUEST, 
    CHECK_TOKEN_VALIDITY_SUCCESS, 
    CHECK_TOKEN_VALIDITY_FAILURE 
} from './ActionType'
import axios from 'axios'
import { api } from '../../config/apiUrl';


//REGISTER USER
export const register = (userData, navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
        const user = res?.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch({
            type: REGISTER_SUCCESS,
            payload: user,
        });
        navigate('/');
        return true;
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
        return false;
    }
};


//LOGIN USER
export const login = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const user = res.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user.jwt,
        });
        navigate('/');
        return Promise.resolve();
    } catch (error) {
        console.log(error, "Error");
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data : error.message
        });
        return Promise.reject();
    }
};

//LOGOUT
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();

}

//GET USER DATA
export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
        const res = await axios.get(`${API_BASE_URL}/api/user-profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            },
        });
        const user = res.data;
        dispatch({
            type: GET_USER_SUCCESS,
            payload: user,
        });
    } catch (error) {
        dispatch({
            type: GET_USER_FAILURE,
            payload: error.response ? error.response.data.error : 'An error occurred',
        });
    }
};

//LOGIN WITH GOOGLE
export const googlelogin = (userData, navigate) => async (dispatch) => {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/google-login`, userData);
        const user = res.data;
        console.log(user,"user")
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        }
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: user.token,
        });
        navigate('/')
    } catch (error) {
        dispatch({
            type: GOOGLE_LOGIN_FAILURE,
            payload: error.message,
        });
    }
};

//UPDATE USER DATA
export const updateUser = (updatedUserData, jwt) => async (dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    try {
        const res = await api.put(`${API_BASE_URL}/api/update-user`, updatedUserData, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        });
        const updatedUser = res.data.user;
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: updatedUser
        });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAILURE,
            payload: error.response?.data?.message || error.message
        });
    }
};


//UPDATE USER DATA
//UPDATE USER DATA
export const forgotPassword = (data) => async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
        const res = await api.post(`${API_BASE_URL}/auth/forgot-password`, data);
        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: res.data, // Assuming res.data contains the success message
        });
    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const resetPassword = (data) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const response = await api.post(`/auth/reset-password/${data.token}`, {
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        });

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data.message, // Backend success message
        });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const checkTokenValidity = (token) => async (dispatch) => {
    dispatch({ type: CHECK_TOKEN_VALIDITY_REQUEST });
    
    try {
        // Send a request to the backend API to check token validity
        const response = await api.post('/auth/check-token-validity', { token });
        
        // If the response is successful, dispatch the success action
        dispatch({
            type: CHECK_TOKEN_VALIDITY_SUCCESS,
            payload: response.data, // Assuming response.data contains validity info
        });
    } catch (error) {
        // If an error occurs, dispatch the failure action
        dispatch({
            type: CHECK_TOKEN_VALIDITY_FAILURE,
            payload: error.response?.data || error.message,
        });
    }
};