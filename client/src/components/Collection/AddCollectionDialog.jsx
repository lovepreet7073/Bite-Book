import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Grid,
    Divider,
    Box,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createCollection } from "../../redux/Collection/Actions";
import { API_BASE_URL } from "../../config/apiUrl";
import { addRecipeToCollection } from "../../redux/Collection/Actions";
const AddCollectionDialog = ({ open, onClose, recipe }) => {
    const { collection } = useSelector(store => store)
    console.log(collection, 'collections')
    const [dialogStep, setDialogStep] = useState("main"); // Tracks current dialog step
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [collectionName, setCollectionName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    // Handle checkbox selection
    const handleCollectionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCollections((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };


    const handleCreateCollection = () => {
        const data = {
            name: collectionName,
            description: description,
        };
        dispatch(createCollection(data));
        setCollectionName("");
        setDescription("");
        setDialogStep("main"); // Go back to the main dialog
    };

    // Main dialog: Saved Recipes
    const renderMainDialog = () => (
        <>
            <DialogTitle>
                <Typography
                    variant="h6"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <FaHeart className="text-primary" size={20} />
                    Added to Saved Recipes
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container alignItems="center">
                    {/* Left Section: Recipe Image and Title */}
                    <Grid item xs={5}>
                        <div className="border rounded">
                            <img
                                src={`${API_BASE_URL}/images/${recipe.imageUrl[0]}`}
                                className="lg:h-[15rem] w-full object-cover object-top"
                                style={{

                                    marginBottom: "16px",
                                }}
                            />
                            <Typography variant="body1">{recipe?.title}</Typography>
                        </div>
                    </Grid>

                    {/* Vertical Divider */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            mx: 2,
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                        }}
                    />

                    {/* Right Section: Add to Collections */}
                    <Grid item xs={6} >
                        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                            Add to collections
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                overflowY: "auto", 
                                height:'200px' // Enable vertical scrolling
                            }}
                        >
                            {/* Dynamically Render Checkboxes */}
                            {collection?.allCollection?.map((col) => (
                                <FormControlLabel
                                    key={col._id}
                                    control={
                                        <Checkbox
                                            value={col.name}
                                            onChange={handleCollectionChange}
                                            checked={selectedCollections.includes(col.name)}
                                        />
                                    }
                                    label={col.name}
                                />
                            ))}


                            {["Keepers", "Want to Try", "Weeknight Ideas"].map((suggestion) => (
                                <FormControlLabel
                                    key={suggestion}
                                    control={
                                        <Checkbox
                                            value={suggestion}
                                            onChange={handleCollectionChange}
                                            checked={selectedCollections.includes(suggestion)}
                                        />
                                    }
                                    label={
                                        <Typography>
                                            {suggestion} <span style={{ color: "grey" }}>(suggested)</span>
                                        </Typography>
                                    }
                                />
                            ))}
                        </Box>
                        <Button 
                            onClick={() => setDialogStep("create")} // Transition to create collection
                            sx={{
                                color: "#E55A12",
                                marginTop:'20px',
                                // border:'1px solid #E55A12',
                                "&:hover": {
                                    borderColor: "#E55A12",
                                },
                            }}
                        >
                            + Create Collection
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions
                sx={{
                    display: "flex",
                    gap: "23%",
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        color: "black",
                    }}
                >
                    <span>
                        <MdDeleteOutline size={20} />
                    </span>
                    Remove
                </Button>
                <Button
                    sx={{
                        bgcolor: "#FF6216",
                        marginTop: 1,
                        "&:hover": {
                            bgcolor: "#E55A12",
                        },
                    }}
                    onClick={handleAddRecipe}
                    variant="contained"
                    color="primary"
                >
                    Done
                </Button>
            </DialogActions>
        </>
    );


    // Create collection dialog
    const renderCreateCollectionDialog = () => (
        <>
            <DialogTitle>
                <Typography variant="h6" fontWeight="bold">
                    New Collection
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                    Collection Name
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Lunch, Dinner, Dessert..."
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    sx={{ marginBottom: 3 }}
                />

                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                    Description (optional)
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="How would you describe this collection?"
                    multiline
                    rows={3}
                    inputProps={{ maxLength: 120 }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Typography
                    variant="caption"
                    display="block"
                    align="right"
                    sx={{ color: "#888", marginTop: 1 }}
                >
                    {description.length}/120 characters
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setDialogStep("main")} // Go back to the main dialog
                    color="primary"
                    sx={{ marginRight: 2 }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleCreateCollection}
                    variant="contained"
                    disabled={!collectionName.trim()}
                    sx={{
                        bgcolor: "#FF6216",
                        "&:hover": { bgcolor: "#E55A12" },
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </>
    );

    const handleAddRecipe = async () => {
        try {
            // Extract selected collections from suggestions
            const collectionsToCreate = selectedCollections.filter(
                (name) => !collection.allCollection.some((col) => col.name === name)
            );

            // Create missing collections
            const createdCollections = await Promise.all(
                collectionsToCreate.map((name) => {
                    const data = { name, description: "" }; // Assuming no description for suggestions
                    return dispatch(createCollection(data)).then((response) => response.payload);
                })
            );

            // Combine existing and newly created collection IDs
            const collectionIds = selectedCollections.map((name) => {
                const existing = collection.allCollection.find((col) => col.name === name);
                return existing ? existing._id : createdCollections.find((col) => col.name === name)._id;
            });

            // Prepare data for adding recipe to collections
            const data = {
                recipeId: recipe._id,
                selectedCollections: collectionIds,
            };

            // Dispatch action to add the recipe to collections
            await dispatch(addRecipeToCollection(data));
            onClose(); // Close dialog on success
        } catch (error) {
            console.error("Failed to add recipe to collections:", error);
        }
    };



    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {dialogStep === "main" && renderMainDialog()}
            {dialogStep === "create" && renderCreateCollectionDialog()}
        </Dialog>
    );
};

export default AddCollectionDialog;
