import React, { useState } from 'react';
import { Grid, Box, Typography, Rating } from '@mui/material';
import VariantAvatars from '../Avatar';
import moment from 'moment';

const Reviews = ({ userReviews }) => {
  // State to track which reviews are expanded
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the state for the specific review
    }));
  };

  return (
    <div className="border-t mt-[20px]">
      <h2 className="font-semibold text-3xl mb-4 mt-3">
        Reviews ({userReviews && userReviews.length > 0 ? userReviews.length : '0'})
      </h2>

      <Grid item xs={12} md={6}>
        <Box className="mt-0 px-1 py-2">
          {userReviews && userReviews.length > 0 ? (
            userReviews.map((review, index) => (
              <Box
                key={index}
                className="p-0 mb-4 mt-4 bg-white rounded-lg border-b mb-3"
              >
                <Box display="flex" alignItems="center" mb={3} gap={1}>
                  <VariantAvatars username={review.userId.fullName} className="mr-4" />
                  <Typography variant="body1" className="font-medium ml-2">
                    {review.userId.fullName}
                  </Typography>
                </Box>
                <div className="flex gap-4 mt-0">
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="caption" className="text-gray-500">
                    {moment(review.createdAt).format('MM/DD/YYYY')}
                  </Typography>
                </div>

                <Typography
                  variant="body2"
                  className="mt-4"
                  sx={{ marginTop: 2, fontSize: '14px', marginBottom: 1 }}
                >
                  {/* Conditionally render the review comment based on length */}
                  {expandedReviews[index] || review.comment.length <= 100
                    ? review.comment
                    : `${review.comment.substring(0, 100)}...`}

                  {review.comment.length > 100 && (
                    <span
                      className="text-orange-500 cursor-pointer"
                      onClick={() => toggleReview(index)} // Toggle review visibility
                    >
                      {expandedReviews[index] ? ' Show Less' : ' Read More'}
                    </span>
                  )}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" className="text-gray-500">
              No reviews yet.
            </Typography>
          )}
        </Box>
      </Grid>
    </div>
  );
};

export default Reviews;
