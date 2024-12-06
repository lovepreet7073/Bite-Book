const express = require('express')
const router = express.Router();
const authController = require('../Controller/authController');
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/google-login', authController.GoogleLogin)
router.post('/forgot-password', authController.ForgetPassword);
router.post('/reset-password/:token', authController.ResetPassword)
router.post('/check-token-validity', authController.CheckTokenValidity);
module.exports = router