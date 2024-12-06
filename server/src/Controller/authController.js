const userService = require('../Services/userService')
const User = require('../Models/userModel')
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const sendMail = require("../Config/mailProvider");
const bcrypt = require("bcryptjs");
const jwtProvider = require('../Config/jwtProvider')
const Token = require('../Models/tokenSchema')
//REGISTER USER
const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);
        return res.status(200).send({ jwt, user, message: "Register Sucessfully" })
    } catch (error) {
        console.log(error, "error")
        return res.status(500).send({ error: error.message })
    }
}

//LOGIN USER
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

//LOGIN WITH GOOGLE
const GoogleLogin = async (req, res) => {
    try {
        const { googleToken } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const googleUser = ticket.getPayload();
        if (!googleUser) {
            return res.status(400).json({ message: "Invalid Google token" });
        }
        const user = await userService.getUserByEmail(googleUser.email);
        if (user) {
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
        const newUser = await User.create({
            fullName: googleUser.given_name + ' ' + googleUser.family_name, // Concatenate first and last name
            email: googleUser.email,
            password: await bcrypt.hash(process.env.SECRET_KEY + googleUser.email, 10), // Use bcrypt to hash password
        });
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

//FORGOT PASSWORD
const ForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(422).json({ message: "User not registered" });
        }
        const existingToken = await Token.findOne({
            userId: user._id,
            expiresAt: { $gt: new Date() }, // Check if the token is still valid
        });

        if (existingToken) {
            return res.status(400).json({
                message: "Password reset link is still valid. Check your email",
            });
        }

        // Create a new token
        const token = jwtProvider.generateToken({ _id: user._id }, '10m'); // Valid for 10 minutes
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        const newToken = new Token({
            userId: user._id,
            token,
            expiresAt,
        });

        await newToken.save();
        const mailHtml = `
            <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #FF6216; border-radius: 10px; overflow: hidden;">
                <div style=" padding: 20px; text-align: center;">
                    <h2 style="margin: 0; font-size: 24px;">Password Reset</h2>
                </div>
                <div style="padding: 20px; text-align: center; background-color: #ffffff;">
                    <p style="font-size: 16px; color: #333333;">
                        Seems like you forgot your password. Don’t worry, click the button below to reset it.
                    </p>
                    <a href="http://localhost:5173/auth/reset-password/${token}" 
                        style="display: inline-block; margin: 20px 0; padding: 12px 20px; font-size: 16px; color: white; background-color: #FF6216; text-decoration: none; border-radius: 5px;">
                        Reset My Password
                    </a>
                    <p style="font-size: 14px; color: #666666; margin-top: 20px;">
                        If you did not request a password reset, you can safely ignore this email.
                    </p>
                </div>
            </div>
        `;
        await sendMail(email, "Password Reset", mailHtml);

        return res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        console.error("Forget password error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


//RESET PASSWORD
const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    try {
        // Verify if the token exists in the database
        const storedToken = await Token.findOne({ token });
        if (!storedToken) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Decode the userId from the token
        const userId = jwtProvider.getUserIdByToken(token);

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the token after successful password reset
        await storedToken.deleteOne();

        return res.json({ status: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
const CheckTokenValidity = async (req, res) => {
    const { token } = req.body;  // Assuming the token is sent in the request body

    try {
        const decodedToken = jwtProvider.getUserIdByToken(token);  // This will decode the token and verify it
        if (!decodedToken) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        const storedToken = await Token.findOne({ token });
        if (!storedToken) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        return res.json({ status: true, message: "Token is valid" });
        
    } catch (error) {
        console.error("Error checking token validity:", error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    register, login, GoogleLogin, ForgetPassword, ResetPassword,CheckTokenValidity
}