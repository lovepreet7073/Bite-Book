import React, { useState } from 'react';
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCollection } from '../../redux/Collection/Actions';
const CollectionDialog = ({ open, onClose }) => {
    const [collectionName, setCollectionName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const handleCreateCollection = () => {
        console.log({
            collectionName,
            description,
        });
        const data = {
            name: collectionName,
            description: description,
        }
        dispatch(createCollection(data))
        setCollectionName('');
        setDescription('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
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
                    sx={{ color: '#888', marginTop: 1 }}
                >
                    {description.length}/120 characters
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" sx={{ marginRight: 2 }}>
                    Cancel
                </Button>
                <Button
                    onClick={handleCreateCollection}
                    variant="contained"
                    disabled={!collectionName.trim()}
                    sx={{
                        bgcolor: '#FF6216',
                        '&:hover': { bgcolor: '#E55A12' },
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CollectionDialog;
