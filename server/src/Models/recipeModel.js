const mongoose = require('mongoose');
const reviewSchema = require('./ratingModel')
const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cuisine: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true,
    },
    directions: {
        type: [String],
        required: true,
    },
    prepTime: {
        time: {
            type: Number,
        },
        unit: {
            type: String,
            enum: ['mins', 'hours', 'days'],
        }
    },
    cookTime: {
        time: {
            type: Number,
            default: 0,
        },
        unit: {
            type: String,
            enum: ['mins', 'hours', 'days'],
        }
    },
    notes: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: [String],
        required: true,
        default: [],
    }, reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review', // Reference to the Review model
        },
    ],
    

}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
