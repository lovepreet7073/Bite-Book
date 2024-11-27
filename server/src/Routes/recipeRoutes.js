const express = require('express')
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const { authenticate } = require('../Middleware/authenticate');
const upload = require('../Middleware/multer');


// Modify this to handle multiple images instead of a single image
router.post('/add-recipe', authenticate, upload.array('imageUrl', 10), recipeController.addRecipe);
router.get('/all-recipes', recipeController.getAllRecipes)
router.get('/recipe-get/:id', authenticate, recipeController.findRecipeById)
router.get('/recipes/search', recipeController.SearchRecipe)
router.get('/user-recipe-get/:id', authenticate, recipeController.userRecipes)
router.delete('/delete-recipe/:recipeId', authenticate, recipeController.deleteRecipe)
router.put('/update-recipe/:recipeId', upload.array('imageUrl', 10), authenticate, recipeController.updateRecipe)
router.post('/rate-recipe/:recipeId', authenticate, recipeController.postReview)
router.put('/update-review/:recipeId/:reviewId', authenticate, recipeController.UpdateReview)
router.delete('/remove-favorites/:recipeId', authenticate, recipeController.deleteRecipeFavorites)
router.get('/popular-recipes', recipeController.getPopularRecipes)
module.exports = router