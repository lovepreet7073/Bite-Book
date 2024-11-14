import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import { RemoveRecipeFavorites } from '../../redux/Recipe/Actions'; 
import { API_BASE_URL } from '../../config/apiUrl';
const SavedRecipes = () => {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [open, setOpen] = useState(false); 
    const handleOpenDialog = (recipe) => {
        
        setSelectedRecipe(recipe._id);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setSelectedRecipe(null);
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        setOpen(false);

        dispatch(RemoveRecipeFavorites(selectedRecipe)); // Dispatch action here
    };

    return (
        <div>
            <h1 className='text-3xl font-bold'>Recently Saved Recipes</h1>
            <div className="grid lg:grid-cols-3 gap-4 mt-[5%]">
                {auth?.userFavorites?.length > 0 ? (
                    auth?.userFavorites.map((recipe) => {
                        const imageUrl = Array.isArray(recipe.imageUrl)
                            ? recipe.imageUrl[0]
                            : recipe.imageUrl;

                        return (
                            <div
                                key={recipe._id}
                                className="hover:cursor-pointer w-[16rem] px-2 py-4"
                                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2">
                                    <div className="h-[13rem]">
                                        <img
                                            className="h-full w-full object-cover object-top"
                                            src={`${API_BASE_URL}/images/${imageUrl}`}
                                            alt={recipe.title}
                                        />
                                    </div>

                                    {/* Recipe Title */}
                                    <div className="px-1 bg-white flex justify-between">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words w-48">
                                            {recipe.title}
                                        </h5>

                                        <AiOutlineDelete
                                            size={24}
                                            className="text-primary"
                                            title='remove from list'
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation
                                            handleOpenDialog(recipe); // Open confirmation dialog
                                        }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Typography>No recipes found.</Typography>
                )}
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Removal</DialogTitle>
                <DialogContent>
                    Are you sure you want to remove this recipe from your favorites?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} variant='contained' sx={{
                        bgcolor: '#FF6216', // Use the primary color from Tailwind config
                        '&:hover': {
                            bgcolor: '#E55A12', // Change to secondary color from Tailwind config on hover
                        },
                    }} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SavedRecipes;
