const userService = require('../Services/userService')
const jwtProvider = require('../Config/jwtProvider')
const User = require('../Models/userModel')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const register = async (req, res) => {
    try {
        const user = await userService.Register(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt, user, message: "Register Sucessfully" })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).send({ error: error.message })

    }
}


const login = async (req, res) => {
    const { password, email } = req.body;
    try {

        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).send({ error: "User not found with email" });
        }


        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send({ error: "Invalid Password" });
        }


        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({
            jwt,
            message: "User logged in successfully",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,

            },
        });

    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const GoogleLogin = async (req, res) => {
    try {
        const { googleToken } = req.body;

        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const googleUser = ticket.getPayload();

        if (!googleUser) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        // Check if the user already exists based on email
        const user = await userService.getUserByEmail(googleUser.email);

        if (user) {
            // If the user exists, generate a token and respond
            const token = jwtProvider.generateToken(user._id);
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                 
                }
            });
        }

        // If the user doesn't exist, create a new user
        const newUser = await User.create({
            fullName: googleUser.given_name + ' ' + googleUser.family_name, // Concatenate first and last name
            email: googleUser.email,
            password: await bcrypt.hash(process.env.SECRET_KEY + googleUser.email, 10), // Use bcrypt to hash password
        });

        // Generate a token for the new user
        const token = jwtProvider.generateToken(newUser._id);

        return res.status(201).json({
            message: "User created and logged in",
            token,
            user: {
                id: newUser._id, // Use newUser here, not user
                fullName: newUser.fullName,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error('Error logging in with Google:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    register, login, GoogleLogin
}