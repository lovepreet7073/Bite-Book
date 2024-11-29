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
    Grid,
    Divider,
    Box,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createCollection, addRecipeToCollection } from "../../redux/Collection/Actions";
import { API_BASE_URL } from "../../config/apiUrl";
import CollectionDialog from "./CollectionDialog";

const AddCollectionDialog = ({ open, onClose, recipe }) => {
    const { collection } = useSelector((store) => store);
    console.log(collection, "collection")
    const filteredNames = collection.allCollection.map(coll => coll.name);
    const suggestions = ["Keepers", "Want to Try", "Weeknight Ideas"];
    const filteredSuggestions = suggestions.filter(suggestion => {
        return !filteredNames.includes(suggestion); // Filter suggestions that are not in filteredNames
    });
    const [dialogStep, setDialogStep] = useState("main"); // Tracks current dialog step
    const [selectedCollections, setSelectedCollections] = useState([]);
    console.log(selectedCollections, "selectedCollections")

    const dispatch = useDispatch();
    const handleCollectionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCollections((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    const handleAddRecipe = async () => {
        try {
            const collectionsToCreate = selectedCollections.filter(
                (name) => !collection.allCollection.some((col) => col.name === name)
            );
            const createdCollections = await Promise.all(
                collectionsToCreate.map((name) =>
                    dispatch(createCollection({ name, description: "" })))
            );
            const collectionIds = selectedCollections.map((name) => {
                const existing = collection.allCollection.find((col) => col.name === name);
                return existing ? existing._id : createdCollections.find((col) => col.name === name)._id;
            });
            await dispatch(addRecipeToCollection({
                recipeId: recipe._id,
                selectedCollections: collectionIds,
            })
            );
            onClose(); // Close dialog on success
        } catch (error) {
            console.error("Failed to add recipe to collections:", error);
        }
    };

    const renderMainDialog = () => (
        <>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
                <RxCross2 onClick={onClose} className="cursor-pointer" />
            </DialogTitle>
            <DialogContent>
                <Grid container alignItems="center">
                    <Grid item xs={5}>
                        <div className="border rounded">
                            <img
                                src={`${API_BASE_URL}/images/${recipe.imageUrl[0]}`}
                                className="lg:h-[15rem] w-full object-cover object-top"
                                alt="Recipe"
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
                    <Grid item xs={6}>
                        <Typography variant="h6" sx={{ marginBottom: "16px" }}>
                            Add to collections
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                overflowY: "auto", // Enable vertical scrolling
                                height: "200px",
                            }}
                        >
                            {collection?.allCollection?.map((col) => {
                                const isSelected = col.recipes?.some((r) => {
                                    return r._id === recipe?._id; // Compare the _id of the recipe object
                                });
                                return (
                                    <FormControlLabel
                                        key={col._id}
                                        control={
                                            <Checkbox
                                                value={col.name}
                                                onChange={handleCollectionChange}
                                                checked={isSelected}
                                            />
                                        }
                                        label={col.name}
                                    />
                                );
                            })}



                            {
                                filteredSuggestions.map((suggestion) => (
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
                                marginTop: "20px",
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
                    <MdDeleteOutline size={20} />
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

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {dialogStep === "main" && renderMainDialog()}
            {dialogStep === "create" && (
                <CollectionDialog
                    open={dialogStep === "create"}
                    onClose={() => setDialogStep("main")}
                />
            )}
        </Dialog>
    );
};

export default AddCollectionDialog;
