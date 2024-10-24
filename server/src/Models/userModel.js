const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
    },
    profile_pic: {
        type: String,

    },


    createdAt: {
        type: Date,
        default: Date.now()
    }

})

const User = mongoose.model("users", userSchema)
module.exports = User;                                                      