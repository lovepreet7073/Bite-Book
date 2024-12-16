const express = require('express');
const router = express.Router();
const recipeController = require('../Controller/recipeController');
const { authenticate } = require('../Middleware/authenticate');
const upload = require('../Middleware/multer');

// Recipe routes
router.post('/add-recipe', authenticate, upload.array('imageUrl', 10), recipeController.addRecipe);
router.get('/all-recipes', recipeController.getAllRecipes);
router.get('/recipe-get/:id', authenticate, recipeController.findRecipeById);
router.get('/recipes/search', recipeController.SearchRecipe);
router.get('/user-recipe-get/:id', authenticate, recipeController.userRecipes);
router.delete('/delete-recipe/:recipeId', authenticate, recipeController.deleteRecipe);
router.put('/update-recipe/:recipeId', upload.array('imageUrl', 10), authenticate, recipeController.updateRecipe);

// Review routes
router.post('/rate-recipe/:recipeId', authenticate, recipeController.postReview);
router.get('/recipe-with-reviews/:recipeId', authenticate, recipeController.getRecipeWithReviews);
router.put('/update-review/:recipeId/:reviewId', authenticate, recipeController.UpdateReview);
// router.put('/manage-review/:recipeId', authenticate, recipeController.manageReview); // New route to approve/decline reviews

// Favorites and Popular recipes
router.delete('/remove-favorites/:recipeId', authenticate, recipeController.deleteRecipeFavorites);
router.get('/popular-recipes', recipeController.getPopularRecipes);
 
//share-recipe link
router.post('/share-link-recipe', authenticate, recipeController.generateShareRecipe)
module.exports = router;
