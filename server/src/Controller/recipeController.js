const Recipe = require('../Models/recipeModel')
const userService = require('../Services/userService')

const addRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, directions, notes, cuisine } = req.body;

        // Parse JSON strings for prepTime and cookTime
        const prepTime = JSON.parse(req.body.prepTime);
        const cookTime = JSON.parse(req.body.cookTime);

        const userId = req.user._id;

        let imageUrl = [];

        // Check if files are uploaded and add their filenames to imageUrl array
        if (req.files && req.files.length > 0) {
            imageUrl = req.files.map(file => file.filename); // Map over the files to get their filenames
        }

        // Create new recipe document
        const newRecipe = new Recipe({
            userId,
            title,
            description,
            cuisine,
            ingredients: JSON.parse(ingredients), // Parse array if needed
            directions: JSON.parse(directions),   // Parse array if needed
            prepTime,  // Object: { time, unit }
            cookTime,  // Object: { time, unit }
            notes,
            imageUrl,  // Store the array of image names
        });

        // Save the recipe to the database
        await newRecipe.save();

        // Return success response
        res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Error adding recipe', error });
    }
};

const getAllRecipes = async (req, res) => {
    try {
        const { ingredient, cuisine } = req.query;
        let query = {};

        if (ingredient) {
            // Case-insensitive search for ingredients using $regex
            query.ingredients = { $in: [new RegExp(ingredient, 'i')] };
        }

        if (cuisine) {
            // Case-insensitive search using $regex
            query.cuisine = { $regex: new RegExp(cuisine, 'i') };
        }
        // Fetch the recipes based on the query
        const recipes = await Recipe.find(query);
        console.log(query, "query", recipes, 'recipes')
        // Send the response
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

const findRecipeById = async (req, res) => {

    const recipeId = req.params.id;
    try {
        const recipe = await Recipe.findById(recipeId).populate('userId')
        return res.status(201).send(recipe)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const SearchRecipe = async (req, res) => {
    try {
        const { query } = req.query;


        const recipes = await Recipe.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { ingredients: { $regex: query, $options: 'i' } },
                { cuisine: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while searching for recipes', error });
    }
}
const userRecipes = async (req, res) => {
    try {
        const { id } = req.params;  // Access the "id" from the params
        console.log('UserId from params:', id);

        const recipes = await Recipe.find({ userId: id });  // Use "id" as userId
        if (!recipes || recipes.length === 0) {
            return res.status(404).json({ message: "No recipes found for this user" });
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const likeRecipe = async (req, res) => {
    try {
        const { recipeId, userId } = req.params;

        const recipe = await Recipe.findById(recipeId);
        const user = await userService.findUserById(userId);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "" });
        }
        const likedIndex = recipe.likedBy.indexOf(userId);
        if (likedIndex !== -1) {
            recipe.likedBy.splice(likedIndex, 1);
            recipe.likes -= 1;
        } else {
            recipe.likedBy.push(userId);
            recipe.likes += 1;
        }

        const savedRecipe = await recipe.save();
        await savedRecipe.populate("userId");
        res.status(200).json(savedRecipe);
    } catch (error) {
        console.error("Error liking recipe:", error);
        res
            .status(500)
            .json({ message: "An error occurred while liking the recipe." });
    }
}


const deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        // Find the recipe by ID
        const recipe = await Recipe.findById(recipeId);

        // If recipe doesn't exist, return a 404 error
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Delete the recipe
        await Recipe.findByIdAndDelete(recipeId);

        // Return success response
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: 'An error occurred while deleting the recipe', error: error.message });
    }
};


const updateRecipe = async (req, res) => {
    try {
        const { title, cuisine, description, ingredients, directions, imageUrl, notes, cookTime, prepTime, } = req.body;
  console.log(req.body,"req.body;")
        // Access recipeId from params
        const recipeId = req.params.recipeId;

        const updatedRecipe = await Recipe.findByIdAndUpdate(
            recipeId, // Use the recipeId from params
            { title, cuisine, description, ingredients, directions, imageUrl, notes, cookTime, prepTime },
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addRecipe,
    getAllRecipes,
    findRecipeById,
    SearchRecipe,
    userRecipes,
    likeRecipe,
    deleteRecipe,
    updateRecipe
}