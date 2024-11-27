const Recipe = require("../Models/recipeModel");
const userService = require("../Services/userService");

const addRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, directions, notes, cuisine } =
      req.body;

    // Parse JSON strings for prepTime and cookTime
    const prepTime = JSON.parse(req.body.prepTime);
    const cookTime = JSON.parse(req.body.cookTime);

    const userId = req.user._id;

    let imageUrl = [];

    // Check if files are uploaded and add their filenames to imageUrl array
    if (req.files && req.files.length > 0) {
      imageUrl = req.files.map((file) => file.filename); // Map over the files to get their filenames
    }

    // Create new recipe document
    const newRecipe = new Recipe({
      userId,
      title,
      description,
      cuisine,
      ingredients: JSON.parse(ingredients), // Parse array if needed
      directions: JSON.parse(directions), // Parse array if needed
      prepTime, // Object: { time, unit }
      cookTime, // Object: { time, unit }
      notes,
      imageUrl, // Store the array of image names
    });

    // Save the recipe to the database
    await newRecipe.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).json({ message: "Error adding recipe", error });
  }
};

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

    const recipes = await Recipe.find(query).sort({ createdAt: -1 });

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


const findRecipeById = async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipe = await Recipe.findById(recipeId)
      .populate("userId") // Populate recipe creator
      .populate({
        path: "reviews.userId",
        select: "fullName profile_pic", // Only select necessary fields
      });

    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
const userRecipes = async (req, res) => {
  try {
    const { id } = req.params; // Access the "id" from the params
    console.log("UserId from params:", id);

    const recipes = await Recipe.find({ userId: id }); // Use "id" as userId

    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const deleteRecipe = async (req, res) => {
  try {
    const { recipeId } = req.params;

    // Find the recipe by ID
    const recipe = await Recipe.findById(recipeId);

    // If recipe doesn't exist, return a 404 error
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(recipeId);

    // Return success response
    // After deleting the recipe
    res.status(200).json({ message: "Recipe deleted successfully", recipeId: recipeId });

  } catch (error) {
    // Handle any errors
    res.status(500).json({
      message: "An error occurred while deleting the recipe",
      error: error.message,
    });
  }
};
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

    // Collect all image URLs into an array, accounting for different formats
    let newImageUrls = [];
    if (req.body.imageUrl) {
      if (Array.isArray(req.body.imageUrl)) {
        newImageUrls = req.body.imageUrl;
      } else {
        newImageUrls = [req.body.imageUrl];
      }

      // Extract filenames from any URLs present
      newImageUrls = newImageUrls.map((url) => {
        const urlParts = url.split('/');
        return urlParts[urlParts.length - 1]; // Keep only the filename
      });
    }

    // Get new images from uploaded files
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Combine existing and new image filenames
    const updatedImageUrls = [...newImageUrls, ...newImages];
    console.log(updatedImageUrls, "Updated Image Filenames Only");

    // Update the recipe with the new data, storing only filenames in imageUrl
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





const postReview = async (req, res) => {
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Ensure that at least one of `rating` or `comment` is provided
    if (!rating && !comment) {
      return res.status(400).json({ message: "Please provide either a rating, a comment, or both." });
    }

    const newReview = { userId, rating, comment };
    recipe.reviews.push(newReview);
    await recipe.save();

    // Populate the `userId` field in all reviews, including the newly added review
    await recipe.populate({
      path: "reviews.userId",
      select: "fullName profile_pic"
    });

    // Separate the populated reviews and the full recipe
    const populatedReviews = recipe.reviews;
    const updatedRecipe = recipe;

    res.status(201).json({
      reviews: populatedReviews,
      recipe: updatedRecipe
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const UpdateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { recipeId, reviewId } = req.params; // Ensure both recipeId and reviewId are destructured from req.params
  const userId = req.user.id; // Get the logged-in user ID from the request

  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    const review = recipe.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    // Update `updatedAt` manually if timestamps are not automatically managed
    review.updatedAt = new Date();

    await recipe.save();

    // Populate the user details for the review
    await recipe.populate({
      path: "reviews.userId",
      select: "fullName profile_pic",
    });

    // Return the updated review along with the recipe and its reviews
    const updatedReview = recipe.reviews.id(reviewId);

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
      recipe: recipe.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteRecipeFavorites = async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id; // Assuming the user ID is available via the auth middleware

  try {
    // Find the user and remove the recipe from their favorites
    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the recipeId from the user's favorites list
    user.favorites = user.favorites.filter((recipe) => recipe.toString() !== recipeId);

    await user.save();
    res.status(200).json({ message: "Recipe removed successfully", recipeId: recipeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


//popular recipes

const getPopularRecipes = async (req, res) => {
  try {
    // Use a default limit if not provided in the query parameters
    const limit = parseInt(req.query.limit, 10) || 10;

    const popularRecipes = await Recipe.aggregate([
      {
        $addFields: {
          popularityScore: { $size: "$reviews" }, // Count the number of reviews
        }
      },
      {
        $sort: { popularityScore: -1 } // Sort by popularity score in descending order
      },
      {
        $limit: limit // Limit the results
      }
    ]);

    // popularityScore = reviews.length

    res.status(200).json(popularRecipes);
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    res.status(500).json({ message: "Failed to fetch popular recipes" });
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
  UpdateReview
};
