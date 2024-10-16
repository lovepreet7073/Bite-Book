const express = require('express')
const router = express.Router();
const userController = require('../Controller/userController');


router.get('/user-profile', userController.getUserProfile)
module.exports = router