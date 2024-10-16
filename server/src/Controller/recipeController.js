const Recipe = require('../Models/recipeModel')
const addRecipe = async (req, res) => {
    try {
        const { title, description, ingredients, directions, prepTime, cookTime, notes,cuisine } = req.body;

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

const getAllRecipes= async(req,res)=>{
    try {
        const recipes = await Recipe.find(); // Fetch all recipes from the database
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}

const findRecipeById = async (req, res) => {

    const recipeId = req.params.id;
    try {
        const recipe = await Recipe.findById(recipeId).populate('userId')
        return res.status(201).send(recipe)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}



module.exports = {
    addRecipe,
    getAllRecipes,
    findRecipeById
}