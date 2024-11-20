const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 120, 
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        recipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Recipe',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Collection', collectionSchema);
