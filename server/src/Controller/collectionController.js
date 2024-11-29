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
    const { recipeId, selectedCollections } = req.body;

    try {
        const user = await User.findById(req.user._id); // Fetch user based on the provided user ID
        const recipe = await Recipe.findById(recipeId); // Fetch recipe based on the recipe ID

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" }); // Handle recipe not found case
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Handle user not found case
        }

        let message = "";

        // If collections are selected
        if (selectedCollections && selectedCollections.length > 0) {
            for (const collectionId of selectedCollections) {
                const foundCollection = await Collection.findById(collectionId); // Fetch collection by ID

                if (foundCollection) {
                    if (!foundCollection.recipes.includes(recipeId)) {
                        foundCollection.recipes.push(recipeId); // Add recipe to collection if not already present
                        await foundCollection.save(); // Save updated collection
                    }
                } else {
                    console.warn(`Collection with ID ${collectionId} not found`);
                }
            }
            message = "Recipe added to selected collections"; // Success message for collections
        } else {
            // If no collections selected, add the recipe to the user's favorites
            if (!user.favorites.includes(recipeId)) {
                user.favorites.push(recipeId); // Add recipe to favorites if not already present
                message = "Recipe added to saved recipes"; // Success message for favorites
            } else {
                message = "Recipe already in saved recipes"; // If recipe is already in favorites
            }
        }

        // Save the updated user
        await user.save();

        // Fetch the updated favorites list for the user, and populate recipe details
        const updatedFavorites = await User.findById(req.user._id).populate('favorites'); // Populate recipes in favorites

        // Fetch all collections for the user, and populate recipes in collections
        const updatedCollections = await Collection.find({ user: req.user._id }).populate('recipes'); // Populate recipes in collections

        // Send response with both message and the updated data (favorites and collections)
        res.status(200).json({
            message,
            updatedFavorites: updatedFavorites.favorites, // Return the populated favorite recipes
            updatedCollections // Return populated collections with recipes
        });
    } catch (error) {
        console.error("Error adding recipe:", error.message);
        res.status(500).json({ message: "An error occurred while adding the recipe." });
    }
};

const DeleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id; // Assumes authentication middleware sets req.user

        // Find and delete the collection
        const collection = await Collection.findOneAndDelete({ _id: id, user: userId });

        if (!collection) {
            return res.status(404).json({ message: 'Collection not found or you do not have permission to delete it.' });
        }

        // Remove the collection reference from the user's collection array
        await User.findByIdAndUpdate(
            userId,
            { $pull: { collections: id } }, // Assumes a `collections` field exists in the User schema
            { new: true } // Return the updated user document
        );

        return res.status(200).json({ message: 'Collection deleted successfully', collection });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const UpdateCollection = async (req, res) => {
    try {
        const { id } = req.params; // Collection ID
        const { name, description } = req.body;
        if (!name && !description) {
            return res.status(400).json({ message: 'Name or description must be provided.' });
        }
        const updatedCollection = await Collection.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found.' });
        }
        res.status(200).json({ message: 'Collection updated successfully.', data: updatedCollection });
    } catch (error) {
        console.error('Error updating collection:', error);
        res.status(500).json({ message: 'An error occurred while updating the collection.', error: error.message });
    }
};


module.exports = {
    createCollection,
    getAllCollections,
    addRecipeToCollectionOrSave,
    DeleteCollection,
    UpdateCollection
};
