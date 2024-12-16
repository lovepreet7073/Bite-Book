import {
    POST_REVIEW_REQUEST,
    POST_REVIEW_SUCCESS,
    POST_REVIEW_FAILURE,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    GET_REVIEWS_FAILURE,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAILURE,
} from "./ActionType";

const initialState = {
    isLoading: false,
    error: null,
    recipeAllReviews: [], // Store all reviews for a particular recipe
    review: null, // Store pending reviews
};

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        // Post Review Actions
        case POST_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case POST_REVIEW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                review: action.payload.review,
                recipeAllReviews: [action.payload.review, ...state.recipeAllReviews],
            };

        case POST_REVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // Get All Reviews Actions
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                recipeAllReviews: action.payload, // Update reviews with the latest fetched ones
            };

        case GET_REVIEWS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        // Update Review Actions
        case UPDATE_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case UPDATE_REVIEW_SUCCESS:
            {
                const updatedReview = action.payload.review; // Extract updated review from payload
                console.log("Updated Review:", updatedReview); // For debugging

                // Update the review in the recipeAllReviews array
                const updatedReviews = state.recipeAllReviews.map((review) =>
                    review._id === updatedReview._id ? updatedReview : review
                );

                return {
                    ...state,
                    isLoading: false,
                    recipeAllReviews: updatedReviews, // Update the review list with the updated review
                };
            }

        case UPDATE_REVIEW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

