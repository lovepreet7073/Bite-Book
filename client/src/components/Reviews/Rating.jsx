import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Rating, Button, TextField, Typography, Box, Grid, } from "@mui/material";
import { ReviewOnRecipe } from "../../redux/Reviews/Actions";
import showCustomToast from "../Shared/ToastComponent";

const RecipeRatingReview = ({ recipeId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { review } = useSelector(store => store)
  const [hasSubmitted, setHasSubmitted] = useState(false); // Tracks if submission is attempted
 const [error,setError] = useState('')
  const { isLoading } = useSelector(state => state.review);
  console.log(review, "review")
  const handleRatingChange = (event, newValue) => {
    console.log('rating', newValue);
    setRating(newValue);
  };

  const handleSubmit = async () => {
    if (rating === 0 && comment.trim() === "") {
      showCustomToast('Add a rating or comment to submit.', 'error');
      return;
    }

    setHasSubmitted(true); // Mark as submitted
    dispatch(ReviewOnRecipe(recipeId, rating, comment));

    // Reset input fields after dispatch
   
  };

  useEffect(() => {
    if (!hasSubmitted || isLoading) return; // Prevent showing toast until submission is attempted and loading is done
    if (review?.error) {
      setError("Review contains offensive language and cannot be submitted.");
    } else if (review) {
      showCustomToast('Thanks for adding your feedback', 'success');
      setRating(0);
      setError('')
      setComment("");
    }

    setHasSubmitted(false); // Reset submission tracker
  }, [review, isLoading, hasSubmitted]);


  return (
    <div className="mt-[10%]">
      <Grid container spacing={4}>
        <Grid item xs={12} md={12} className="">
          <Box
            className="p-8 border border-slate-200 rounded"
            display="flex"
            flexDirection="column"
            mb={3}
            gap={1}
          >
            <Typography variant="h4" className="mb-4 font-bold">
              Rate and Review
            </Typography>

            <Box className="flex items-center mb-4 mt-3">
              <Typography variant="subtitle1" className="mr-[18px]">
                My Rating
              </Typography>
              <Rating
                value={rating}
                onChange={handleRatingChange}
                size="large"
              />
              {rating > 0 && (
                <Typography className="ml-3 text-gray-500">
                  {rating} out of 5
                </Typography>
              )}
            </Box>

            <TextField
              label="What did you think about this recipe? Did you make any changes or notes?"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4 mt-[14px]"
            />
             {error && (
              <Typography variant="body2" color="error" className="mb-4">
                {error}
              </Typography>
            )}

            <Box display="flex" justifyContent="right" gap={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{
                  bgcolor: "#FF6216",
                  marginTop: 1,
                  "&:hover": {
                    bgcolor: "#E55A12",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeRatingReview;
