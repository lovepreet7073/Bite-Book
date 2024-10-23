const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        }
    ],

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
            required: true,
        },
        unit: {
            type: String,
            enum: ['mins', 'hours', 'days'],
            required: true,
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
            // default: 'mins',
        }
    },
    notes: {
        type: String,
        default: '',
    },
    imageUrl: {
        type: [String],
        default: '',
    },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
