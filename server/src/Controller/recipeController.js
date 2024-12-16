const Recipe = require("../Models/recipeModel");
const userService = require("../Services/userService");
const Review = require('../Models/ratingModel')
const BadWordsFilter = require('bad-words');
// Correct import for ES module

const badWordsFilter = new BadWordsFilter();

console.log(process.env.FRONTEND_URL, "process.env.FRONTEND_URL")

//ADD REVIEW ON RECIPE
const postReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;
  const recipeId = req.params.recipeId;

  try {
    const recipe = await Recipe.findById(recipeId)
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (!rating && !comment) {
      return res.status(400).json({ message: "Please provide either a rating, a comment, or both." });
    }

    // Check for bad words in the comment
    if (comment && badWordsFilter.isProfane(comment)) {
      return res.status(400).json({ message: "Review contains offensive language and cannot be submitted." });
    }

    let review = new Review({ userId, recipeId, rating, comment });
    await review.save();
    review = await Review.findById(review._id).populate('userId', 'name fullName'); // Adjust fields based on your schema
    recipe.reviews.push(review._id);
    await recipe.save();

    res.status(201).json({ message: "Review submitted for approval.", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//ADD RECIPE
const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, directions, notes, cuisine } =
      req.body;
    const prepTime = JSON.parse(req.body.prepTime);
    const cookTime = JSON.parse(req.body.cookTime);
    const userId = req.user._id;
    let imageUrl = [];
    if (req.files && req.files.length > 0) {
      imageUrl = req.files.map((file) => file.filename); // Map over the files to get their filenames
    }
    const newRecipe = new Recipe({
      userId,
      title,
      description,
      cuisine,
      ingredients: JSON.parse(ingredients),
      directions: JSON.parse(directions),
      prepTime,
      cookTime,
      notes,
      imageUrl,
    });
    await newRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Error adding recipe", error });
  }
};

//GET ALL RECIPES(FILTER INCLUDED LOGIC)
const getAllRecipes = async (req, res) => {
  try {
    const { ingredient, cuisine } = req.query;
    let query = {};
    if (ingredient) {
      query.ingredients = { $in: [new RegExp(ingredient, "i")] };
    }
    if (cuisine) {
      query.cuisine = { $regex: new RegExp(cuisine, "i") };
    }
    const recipes = await Recipe.find(query).sort({ createdAt: -1 }).populate('reviews');
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


//FIND RECIPE BY ID 
const findRecipeById = async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeId)
      .populate("userId")
      .populate({
        path: "reviews.userId",
        select: "fullName",
      });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//SEARCH RECIPE
const SearchRecipe = async (req, res) => {
  try {
    const { query } = req.query;
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { ingredients: { $regex: query, $options: "i" } },
        { cuisine: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while searching for recipes", error });
  }
};

//USER PERSONAL RECIPES
const userRecipes = async (req, res) => {
  try {
    const { id } = req.params;
    const recipes = await Recipe.find({ userId: id });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//DELETE RECIPE
const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    await Recipe.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe deleted successfully", recipeId: recipeId });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the recipe",
      error: error.message,
    });
  }
};

//UPDATE RECIPE
const updateRecipe = async (req, res) => {
  try {
    const {
      title,
      cuisine,
      description,
      ingredients,
      directions,
      notes,
      cookTime,
      prepTime,
    } = req.body;
    const recipeId = req.params.recipeId;
    let newImageUrls = [];
    if (req.body.imageUrl) {
      if (Array.isArray(req.body.imageUrl)) {
        newImageUrls = req.body.imageUrl;
      } else {
        newImageUrls = [req.body.imageUrl];
      }
      newImageUrls = newImageUrls.map((url) => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1]; // Keep only the filename
      });
    }
    const newImages = req.files ? req.files.map((file) => file.filename) : [];
    const updatedImageUrls = [...newImageUrls, ...newImages];
    console.log(updatedImageUrls, "Updated Image Filenames Only");
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        title,
        cuisine,
        description,
        ingredients: JSON.parse(ingredients),
        directions: JSON.parse(directions),
        imageUrl: updatedImageUrls,           // Store only filenames
        notes,
        cookTime: JSON.parse(cookTime),
        prepTime: JSON.parse(prepTime),
      },
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const getRecipeWithReviews = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId)
      .populate({
        path: 'reviews', // Populate the reviews array
        populate: {
          path: 'userId', // Nested populate userId in reviews
          select: 'fullName email', // Select specific fields from User
        },
      });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Send the reviews with user details
    res.status(200).json(recipe.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};





//EDIT REVIEW
const UpdateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { recipeId, reviewId } = req.params;

    // Find the review document independently
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check for bad words in the comment before updating
    if (comment && badWordsFilter.isProfane(comment)) {
      return res.status(400).json({ message: "Review contains offensive language and cannot be updated." });
    }

    // Update the review fields
    review.rating = rating;
    review.comment = comment;
    review.updatedAt = Date.now(); // Update the timestamp if needed

    // Save the updated review (independent of the recipe save)
    await review.save();

    // Optionally, you can find the recipe and update it too
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update the review in the recipe's reviews array
    const reviewIndex = recipe.reviews.findIndex(r => r._id.toString() === reviewId);
    if (reviewIndex > -1) {
      recipe.reviews[reviewIndex] = review; // Replace the review in the recipe
    }

    // Save the updated recipe as well
    await recipe.save();

    // Respond with the updated review and recipe
    res.status(200).json({
      message: "Review updated successfully",
      review: review,
      recipe: recipe
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//REMOVE RECIPE FROM USER SAVED RECIPES
const deleteRecipeFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id; // Assuming the user ID is available via the auth middleware
  try {
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.favorites = user.favorites.filter((recipe) => recipe.toString() !== recipeId);
    await user.save();
    res.status(200).json({ message: "Recipe removed successfully", recipeId: recipeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getPopularRecipes = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;

    const popularRecipes = await Recipe.aggregate([
      {
        $addFields: {
          popularityScore: {
            $size: { $ifNull: ["$reviews", []] } // Ensure reviews defaults to an empty array if missing
          }
        }
      },
      {
        $sort: {
          popularityScore: -1, // Sort by popularity score (reviews count)
          createdAt: -1        // Sort by creation date if popularityScore is tied
        }
      },
      {
        $limit: limit // Limit the results
      }
    ]);

    // Once the aggregation is done, we use populate to get the review details
    const populated = await Recipe.populate(popularRecipes, {
      path: 'reviews', // Field to populate (reviews in this case)
      select: 'userId rating comment', // Select which fields from the reviews to populate
    });

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular recipes", error: error.message });
  }
};


const generateShareRecipe = async (req, res) => {
  const { recipeId } = req.body; // Get the recipe ID from the request body

  if (!recipeId) {
    return res.status(400).json({ message: 'Recipe ID is required' });
  }

  try {
    // Fetch the recipe details from the database (assuming a Recipe model)
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Construct the shareable link
    const shareUrl = `${process.env.FRONTEND_URL}/recipe/${recipeId}`;

    // Optionally, return metadata for confirmation or preview on the frontend
    res.status(200).json({
      shareUrl,
      metadata: {
        title: recipe.title,
        description: recipe.description,
        image: recipe.imageUrl,
      },
    });
  } catch (error) {
    console.error('Error generating shareable link:', error);
    res.status(500).json({ message: 'Error generating shareable link' });
  }
};


module.exports = {
  addRecipe,
  getPopularRecipes,
  getAllRecipes,
  findRecipeById,
  SearchRecipe,
  userRecipes,
  deleteRecipe,
  updateRecipe,
  postReview,
  deleteRecipeFavorites,
  UpdateReview,
  getRecipeWithReviews,
  generateShareRecipe
};
