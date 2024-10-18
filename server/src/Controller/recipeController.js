const Recipe = require('../Models/recipeModel')


const addRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, directions, prepTime, cookTime, notes, cuisine } = req.body;

        const userId = req.user._id;


        let imageUrl = null;

        if (req.file) {

            imageUrl = req.file ? req.file.filename : undefined;
        }


        const newRecipe = new Recipe({
            userId,  // Add the userId to associate the recipe with the user
            title,
            description,
            cuisine,
            ingredients,
            directions,
            prepTime,
            cookTime,
            notes,
            imageUrl,  // Store the image name
        });

        // Save the recipe to the database
        await newRecipe.save();

        // Return success response
        res.status(201).json({ message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Error adding recipe', error });
    }
}

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



module.exports = {
    addRecipe,
    getAllRecipes,
    findRecipeById,
    SearchRecipe,
    userRecipes
}