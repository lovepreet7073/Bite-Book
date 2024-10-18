const express = require('express')
const router = express.Router();
const userController = require('../Controller/userController');
const { authenticate } = require('../Middleware/authenticate');


router.get('/user-profile', authenticate,  userController.getUserProfile)
router.put('/update-user', authenticate,userController.updateUser);
module.exports = router