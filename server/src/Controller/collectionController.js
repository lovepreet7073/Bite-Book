const Collection = require('../Models/collectionModel'); // Adjust the path as necessary
const User = require('../Models/userModel')
const Recipe = require('../Models/recipeModel')
// Create a new collection

const createCollection = async (req, res) => {
    const { name, recipes, description } = req.body;

    try {
        // Create a new collection
        const collection = new Collection({
            name,
            description,
            user: req.user._id,
            recipes: recipes || [],
        });

        await collection.save();

        // Push the collection ID to the user's collections array
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { collections: collection._id } },
            { new: true } // Returns the updated document
        );

        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCollections = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authentication middleware

        const collections = await Collection.find({ user: userId })
        .populate('recipes');

        res.status(200).json(collections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        res.status(500).json({ message: 'Failed to fetch collections' });
    }
};

const addRecipeToCollectionOrSave = async (req, res) => {
    const { recipeId, selectedCollections } = req.body; // Destructure request body

    try {
        // Fetch user and recipe
        const user = await User.findById(req.user._id);
        const recipe = await Recipe.findById(recipeId);

        // Validate recipe and user existence
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let message = "";

        // Save to collections
        if (selectedCollections && selectedCollections.length > 0) {
            for (const collectionId of selectedCollections) {
                // Fetch each collection by ID
                const foundCollection = await Collection.findById(collectionId);

                if (foundCollection) {
                    // Add recipe to collection if not already present
                    if (!foundCollection.recipes.includes(recipeId)) {
                        foundCollection.recipes.push(recipeId);
                        await foundCollection.save();
                    }
                } else {
                    console.warn(`Collection with ID ${collectionId} not found`);
                }
            }
            message = "Recipe added to selected collections";
        } else {
            // Save to user's favorites
            if (!user.favorites.includes(recipeId)) {
                user.favorites.push(recipeId);
                message = "Recipe added to saved recipes";
            } else {
                message = "Recipe already in saved recipes";
            }
        }

        // Save the updated user
        await user.save();

        res.status(200).json({ message });
    } catch (error) {
        console.error("Error adding recipe:", error.message);
        res.status(500).json({ message: "An error occurred while adding the recipe." });
    }
};

module.exports = {
    createCollection,
    getAllCollections,
    addRecipeToCollectionOrSave
};
