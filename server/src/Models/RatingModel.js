// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
  rating: {
    type: Number,
    max: 5,
  },
  comment: {
    type: String,
  },

}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
