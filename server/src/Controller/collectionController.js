const Collection = require('../Models/collectionModel'); // Adjust the path as necessary
const User = require('../Models/userModel')
const Recipe = require('../Models/recipeModel')


//CREATE NEW COLLECTION
const createCollection = async (req, res) => {
    const { name, recipes, description } = req.body;
    try {
        const collection = new Collection({
            name,
            description,
            user: req.user._id,
            recipes: recipes || [],
        });
        await collection.save();
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

//GET COLLECTION DETAILS BY ID
const findCollectionById = async (req, res) => {
    const collctionId = req.params.id;
    try {
        const collection = await Collection.findById(collctionId)
            .populate("recipes") // Populate recipe creator
        if (!collection) return res.status(404).json({ message: "Collection not found" });
        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//GET ALL COLLECTIONS
const getAllCollections = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from authentication middleware
        const collections = await Collection.find({ user: userId })
            .populate('recipes');
        res.status(200).json(collections);
    } catch (error) {
        console.log('Error fetching collections:', error);
        res.status(500).json({ message: 'Failed to fetch collections' });
    }
};

//ADD RECIPE TO COLLECTION & SAVE RECIPE
const addRecipeToCollectionOrSave = async (req, res) => {
    const { recipeId, selectedCollections } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let message = "";
        if (selectedCollections && selectedCollections.length > 0) {
            for (const collectionId of selectedCollections) {
                const foundCollection = await Collection.findById(collectionId);
                if (foundCollection) {
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
            if (!user.favorites.includes(recipeId)) {
                user.favorites.push(recipeId);
                message = "Recipe added to saved recipes";
            } else {
                message = "Recipe already in saved recipes";
            }
        }
        await user.save();
        const updatedFavorites = await User.findById(req.user._id).populate('favorites');
        const updatedCollections = await Collection.find({ user: req.user._id }).populate('recipes');
        res.status(200).json({
            message,
            updatedFavorites: updatedFavorites.favorites,
            updatedCollections
        });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while adding the recipe." });
    }
};

//DELETE COLLECTION
const DeleteCollection = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const collection = await Collection.findOneAndDelete({ _id: id, user: userId });
        if (!collection) {
            return res.status(404).json({ message: 'Collection not found or you do not have permission to delete it.' });
        }
        await User.findByIdAndUpdate(
            userId,
            { $pull: { collections: id } },
            { new: true }
        );
        return res.status(200).json({ message: 'Collection deleted successfully', collection });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//UPDATE COLLECTION
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
        ).populate('recipes');
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found.' });
        }
        res.status(200).json({ data: updatedCollection });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the collection.', error: error.message });
    }
};

//REMOVE RECIPE FROM COLLECTION
const RemoveRecipeFromCollection = async (req, res) => {
    const { collectionId, recipeId } = req.params;
    try {
        const updatedCollection = await Collection.findByIdAndUpdate(
            collectionId,
            { $pull: { recipes: recipeId } }, // Remove recipeId from recipes array
            { new: true } // Return the updated document
        );
        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }
        res.status(200).json({ message: "Recipe removed successfully", recipeId: recipeId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createCollection,
    getAllCollections,
    addRecipeToCollectionOrSave,
    DeleteCollection,
    UpdateCollection,
    findCollectionById,
    RemoveRecipeFromCollection
};
