import React, { useState } from 'react';
import { Grid, Box, Typography, Rating } from '@mui/material';
import VariantAvatars from '../Navbar/Avatar';
import moment from 'moment';

const Reviews = ({ userReviews }) => {
  // State to track if all reviews are expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit the number of reviews to show initially (e.g., 5)
  const reviewsToShow = isExpanded ? userReviews : userReviews?.slice(0, 5);

  const toggleReviewVisibility = () => {
    setIsExpanded((prev) => !prev); // Toggle between showing all reviews or just 5
  };

  return (
    <div className="border-t mt-[20px]">
      <h2 className="font-semibold text-3xl mb-4 mt-3">
        Reviews ({userReviews && userReviews.length > 0 ? userReviews?.length : '0'})
      </h2>

      <Grid item xs={12} md={6}>
        <Box className="mt-0 px-1 py-2">
          {userReviews && userReviews.length > 0 ? (
            reviewsToShow?.map((review, index) => (
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
                  {review.rating ? <Rating value={review.rating} readOnly size="small" /> : (
                    <p className='text-sm text-gray-500'>No rating provided</p>
                  )}

                  <Typography variant="caption" className="text-gray-500">
                    {moment(review.createdAt).format('MM/DD/YYYY')}
                  </Typography>
                </div>

                <Typography
                  variant="body2"
                  className="mt-4"
                  sx={{ marginTop: 2, fontSize: '14px', marginBottom: 1 }}
                >
                  {/* Review comment */}
                  {review.comment}
                </Typography>
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
                className={`text-orange-500 cursor-pointer mb-3 ${isExpanded ? 'mb-[5%]' : 'mb-3 '}`}
                onClick={toggleReviewVisibility}
              >
                {isExpanded ? 'Show Less' : 'Show More Reviews'}
              </span>
            </Box>
          )}
        </Box>
      </Grid>
    </div>
  );
};

export default Reviews;
