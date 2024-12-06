import React, { useState, useEffect } from "react";
import {Typography,Dialog,DialogActions,DialogContent,DialogTitle,Button,TextField,} from "@mui/material";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { createCollection, updateCollection } from "../../redux/Collection/Actions"; // Import the update action

const CollectionDialog = ({ open, onClose, initialData }) => {
    const [collectionName, setCollectionName] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (initialData) {
            setCollectionName(initialData.name || "");
            setDescription(initialData.description || "");
        } else {
            setCollectionName("");
            setDescription("");
        }
    }, [initialData]);

    const handleSaveCollection = () => {
        if (collectionName.trim()) {
            const data = {
                name: collectionName,
                description: description,
            };
            if (initialData) {
                dispatch(updateCollection(initialData._id, data));
            } else {
                dispatch(createCollection(data));
            }
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    {initialData ? "Edit Collection" : "New Collection"}
                    <span onClick={onClose} className="cursor-pointer">
                        <RxCross2 />
                    </span>
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
                    Collection Name
                </Typography>
                <TextField
                    fullWidth
                    required
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
                <Button onClick={onClose} color="primary" sx={{ marginRight: 2 }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveCollection}
                    variant="contained"
                    disabled={!collectionName.trim()}
                    sx={{
                        bgcolor: "#FF6216",
                        "&:hover": { bgcolor: "#E55A12" },
                    }}
                >
                    {initialData ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CollectionDialog;
