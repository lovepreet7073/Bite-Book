const User = require("../Models/userModel");
const bcrypt = require("bcrypt")
const jwtProvider = require("../Config/jwtProvider")

const Register = async (userData) => {
    try {

        const { fullName, email, password } = userData;
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error(`User already exists`);
        }
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,  // Use hashed password
        });

        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw new Error(error.message);
    }
};

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user; // If user not found, this will return null (no need to throw error here)
    } catch (error) {
        console.error('Error in getUserByEmail:', error);
        return null; // If an error occurs, return null
    }
};


const getUserByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdByToken(token);
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("user not found with is:", userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error("user not found with this id:", userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);

    }
}


module.exports = {
    Register,
    getUserByEmail,
    getUserByToken,
    findUserById
}