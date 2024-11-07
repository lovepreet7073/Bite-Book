import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Rating,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import moment from "moment";
import { ReviewOnRecipe, findRecipeById } from "../../redux/Recipe/Actions";
import VariantAvatars from "../Avatar";

const RecipeRatingReview = ({ recipeId, userReviews }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { recipe } = useSelector((store) => store);
  console.log(userReviews, "userReviews");

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    dispatch(ReviewOnRecipe(recipeId, rating, comment));
    setRating(0);
    setComment("");
    await dispatch(fetchRecipeById(recipeId));
  };

  return (
    <div className=" mt-2">
      <Grid container spacing={4}>
        {/* Left Column: All Reviews */}

        {/* Right Column: Review Form */}
        <Grid item xs={12} md={12} className="">
          <Box
            className="p-8  border border-slate-200 rounded"
            display="flex"
            flexDirection="column"
            alignItems=""
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
