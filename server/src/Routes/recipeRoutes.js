const express = require('express')
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const { authenticate } = require('../Middleware/authenticate');
const upload = require('../Middleware/multer');


router.post('/add-recipe',authenticate,upload.single('imageUrl'), recipeController.addRecipe)
router.get('/all-recipes', recipeController.getAllRecipes)
router.get('/recipe-get/:id',recipeController.findRecipeById)
module.exports = router