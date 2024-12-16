import { api } from "../../config/apiUrl";
import {
    POST_REVIEW_FAILURE, POST_REVIEW_REQUEST, POST_REVIEW_SUCCESS, GET_REVIEWS_FAILURE, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, UPDATE_REVIEW_FAILURE, UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS
} from "./ActionType";


//ADD REVIEW ON RECIPE
export const ReviewOnRecipe = (recipeId, rating, comment) => async (dispatch) => {
    dispatch({ type: POST_REVIEW_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const { data } = await api.post(
            `/api/rate-recipe/${recipeId}`,
            { rating, comment },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: POST_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while submitting your review.";
        dispatch({
            type: POST_REVIEW_FAILURE,
            payload: errorMessage,
        });
    }
};

// Action Creator for fetching all pending reviews
// Action Creator for fetching all reviews for a recipe
export const getAllReviews = (recipeId) => async (dispatch) => {
    dispatch({ type: GET_REVIEWS_REQUEST });
    const jwt = localStorage.getItem("jwt"); // Retrieve JWT from local storage
    try {
        const { data } = await api.get(`/api/recipe-with-reviews/${recipeId}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAILURE,
            payload: error.message,
        });
    }
};

export const UpdateReview = ({ recipeId, rating, comment, reviewId }) => async (dispatch) => {
    dispatch({ type: UPDATE_REVIEW_REQUEST });
    const jwt = localStorage.getItem("jwt");
    try {
        const { data } = await api.put(
            `/api/update-review/${recipeId}/${reviewId}`,
            { rating, comment },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data });
        dispatch(getAllReviews(recipeId));  // Assuming `getReviews` is an action to fetch reviews

    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while submitting your review.";
        dispatch({
            type: UPDATE_REVIEW_FAILURE,
            payload: errorMessage,
        });
    }
};

