// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming you have a User model
    required: true,
  },
  rating: {
    type: Number,
    max: 5, // Assuming ratings are from 1 to 5
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = reviewSchema; // Export the schema, not the model
