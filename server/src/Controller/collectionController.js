const Collection = require('../Models/collectionModel'); // Adjust the path as necessary
const User = require('../Models/userModel')
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
  
      // Find all collections belonging to the authenticated user
      const collections = await Collection.find({ user: userId }).populate('recipes'); // Populate the recipe details
  
      // Send the collections as a response
      res.status(200).json(collections);
    } catch (error) {
      console.error('Error fetching collections:', error);
      res.status(500).json({ message: 'Failed to fetch collections' });
    }
  };


module.exports = {
    createCollection,
    getAllCollections
};
