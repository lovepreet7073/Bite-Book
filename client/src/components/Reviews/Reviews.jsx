import React, { useState } from 'react';
import { Grid, Box, Typography, Rating, Button, TextField } from '@mui/material';
import VariantAvatars from '../Navbar/Avatar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import EditDialog from './EditDialog';
import { UpdateReview } from '../../redux/Recipe/Actions';
import { useDispatch } from 'react-redux';
import showCustomToast from '../Shared/ToastComponent';
const Reviews = ({ userReviews, recipeId }) => {
  const { auth } = useSelector((store) => store);
  const [isExpanded, setIsExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const reviewsToShow = isExpanded ? userReviews : userReviews?.slice(0, 5);

  const toggleReviewVisibility = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleEditClick = (review) => {
    setSelectedReview(review);
    setRating(review.rating || 0);
    setComment(review.comment || '');
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedReview(null);
    setRating(0);
    setComment('');
  };

  const handleReviewSubmit = () => {
    const updatedReview = {
      rating,
      comment,
      reviewId: selectedReview._id,
      recipeId,
    };

    // Dispatch the action to update the review
    dispatch(UpdateReview(updatedReview));
    showCustomToast('Updated Successfully', 'success');

    // Close the dialog
    handleDialogClose();
  };

  return (
    <div className="border-t mt-[20px]">
      <h2 className="font-semibold text-3xl mb-4 mt-3">
        Reviews ({userReviews?.length || '0'})
      </h2>

      <Grid item xs={12} md={6}>
        <Box className="mt-0 px-1 py-2">
          {userReviews?.length > 0 ? (
            reviewsToShow?.map((review) => (
              <Box
                key={review._id}
                className="p-0 mb-4 mt-4 bg-white rounded-lg border-b mb-3"
              >
                <Box display="flex" alignItems="center" mb={3} gap={1}>
                  <VariantAvatars username={review.userId.fullName} className="mr-4" />
                  <Typography variant="body1" className="font-medium ml-2">
                    {review.userId.fullName}
                  </Typography>
                </Box>
                <div className="flex gap-4 mt-0">
                  {review.rating ? (
                    <Rating value={review.rating} readOnly size="small" />
                  ) : (
                    <p className="text-sm text-gray-500">No rating provided</p>
                  )}

                  <Typography variant="caption" className="text-gray-500">
                    {moment(review.createdAt).format('MM/DD/YYYY')}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography
                    variant="body2"
                    className="mt-4"
                    sx={{ marginTop: 2, fontSize: '14px', marginBottom: 1 }}
                  >
                    {review.comment}
                  </Typography>
                  {review?.userId._id === auth.user._id && (
                    <Button onClick={() => handleEditClick(review)}>Edit</Button>
                  )}
                </div>
              </Box>
            ))
          ) : (
            <Typography variant="body2" className="text-gray-500">
              No reviews yet.
            </Typography>
          )}

          {/* Show More / Show Less link */}
          {userReviews?.length > 5 && (
            <Box className="mt-4 mb-3">
              <span
                className={`text-orange-500 cursor-pointer mb-3 ${
                  isExpanded ? 'mb-[5%]' : 'mb-3 '
                }`}
                onClick={toggleReviewVisibility}
              >
                {isExpanded ? 'Show Less' : 'Show More Reviews'}
              </span>
            </Box>
          )}
        </Box>
      </Grid>

      {/* Dialog for Editing Review */}
      <EditDialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        title="Edit Review"
        content={
          <div>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              size="large"
              sx={{
                marginBottom: '1rem',
              }}
            />
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
          </div>
        }
        actions={[
          { label: 'Cancel', onClick: handleDialogClose, color: 'secondary', variant: 'outlined' },
          { label: 'Save', onClick: handleReviewSubmit, color: 'primary' },
        ]}
      />
    </div>
  );
};

export default Reviews;

