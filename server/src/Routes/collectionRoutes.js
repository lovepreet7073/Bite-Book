
const express = require('express')
const router = express.Router();
const collectionController = require('../Controller/collectionController');
const { authenticate } = require('../Middleware/authenticate');


router.post('/create-collection', authenticate,collectionController.createCollection  )
router.get('/all-collection', authenticate,collectionController.getAllCollections  )
module.exports = router