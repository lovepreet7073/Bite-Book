import { API_BASE_URL } from '../../config/apiUrl';
import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGIN_FAILURE,
    LOGOUT,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_REQUEST, GOOGLE_LOGIN_SUCCESS
} from './ActionType'
import axios from 'axios'
export const register = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST })
    console.log('inside')
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/register`, userData)
        console.log(res, "res")
        const user = res?.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt)
        }

        dispatch({
            type: REGISTER_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response ? error.response.data : error.message
        })
    }
}


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
        navigate('/')

    } catch (error) {
      console.log(error,"Error")
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response ? error.response.data : error.message
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null })
    localStorage.clear();

}

export const getUser = (jwt) => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const res = await axios.get(`${API_BASE_URL}/api/user-profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        })
        const user = res.data;

        dispatch({
            type: GET_USER_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: GET_USER_FAILURE,
            payload: error.message
        })
    }
}
export const googlelogin = (userData, navigate) => async (dispatch) => {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });

    try {
        const res = await axios.post(`${API_BASE_URL}/auth/google-login`, userData);
        const user = res.data;
        console.log(res, "res-redux")
        if (user.token) {
            localStorage.setItem("jwt", user.token);
        }

        // Dispatch login success with JWT
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: user.token,
        });

        navigate('/')
    } catch (error) {
        // Dispatch failure action
        dispatch({
            type: GOOGLE_LOGIN_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });


    }
};



