import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';
import { RxCross2 } from "react-icons/rx";
import { RemoveRecipeFavorites } from '../../redux/Recipe/Actions';
import { API_BASE_URL } from '../../config/apiUrl';
import RecipeCardSkeleton from '../../components/Shared/RecipeCardSkeleton ';
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationDialog from '../../components/Shared/ConfirmationDialog';
import {
    Dialog,
    Button,
    Box
} from "@mui/material";
import AddCollectionDialog from '../../components/Collection/AddCollectionDialog'
const SavedRecipes = () => {
    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false)
    const [openAddDialog, setopenAddDialog] = useState(false)
    console.log(selectedRecipe, "selectedRecipe")

    const handleAdddDialogClose = () => {
        setopenAddDialog(false)
        setOpenDialog(false)
    };

    const handleOpenDialog = (recipe) => {
        setSelectedRecipe(recipe);
        setOpenDialog(false)
        setOpen(true);
        setopenAddDialog(false)
    };

    const handleAddOpenDialog = (recipe) => {
        setSelectedRecipe(recipe); // Store the entire recipe object
        setopenAddDialog(true);
    };

    const handleMainDialogOpen = (recipe) => {
        setSelectedRecipe(recipe); // Store the entire recipe object
        setOpenDialog(true);
    };
    const handleMainDialogClose = () => {
        setSelectedRecipe(null);
        setOpenDialog(false)
        setOpen(false)
    };

    const handleCloseDialog = () => {
        setSelectedRecipe(null);
        setOpenDialog(false)
        setOpen(false)
    };

    const handleConfirmDelete = () => {
        setOpen(false);
        dispatch(RemoveRecipeFavorites(selectedRecipe?._id)); // Dispatch action here
    };

    return (
        <div>
            <Paper elevation={3} className="p-5 lg:mb-[8%] mb-[15%]">
                <h1 className='text-3xl font-bold'>My Saved Recipes & Collections </h1>
                <h1 className='text-2xl font-semibold mt-5 mb-0 text-gray-500 ml-[4px]'>Recently Saved </h1>
                <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-[1%]">
                    {auth.isLoading ? (
                        <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
                            {Array.from({ length: 6 }).map((_, idx) => (
                                <RecipeCardSkeleton key={idx} />
                            ))}
                        </div>
                    ) : auth?.userFavorites?.length > 0 ? (
                        auth.userFavorites.map((recipe) => {
                            const imageUrl = Array.isArray(recipe.imageUrl)
                                ? recipe.imageUrl[0]
                                : recipe.imageUrl;
                            return (
                                <div
                                    key={recipe._id}
                                    className="hover:cursor-pointer w-[16rem] px-2 py-4"
                                    onClick={() => handleMainDialogOpen(recipe)}

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

                                            {/* <AiOutlineDelete
                                                size={24}
                                                className="text-primary"
                                                title='remove from list'
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent navigation
                                                    handleOpenDialog(recipe); // Open confirmation dialog
                                                }}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <Typography>No recipes found.</Typography>
                    )}
                </div>
                <Dialog open={openDialog} onClose={handleMainDialogClose} maxWidth="sm" fullWidth>
                    <Box sx={{ display: "flex", width: '100%' }}>
                    <RxCross2 onClick={handleCloseDialog} className="cursor-pointer absolute top-1 right-1 z-10" size={25} />
                        <div className='w-[50%] h-full'>
                            <img
                                src={`${API_BASE_URL}/images/${selectedRecipe?.imageUrl[0] || 'default.jpg'}`} // Use recipe data
                                alt={selectedRecipe?.title || 'Recipe'}
                                className="lg:h-[28rem] w-full h-full object-cover object-top"
                            />
                        </div>

                        <Box sx={{ width: '50%', padding: "10px" }}>
                            <Typography variant="h6" component="h2" fontWeight="bold">
                                {selectedRecipe?.title || 'Recipe Title'} {/* Use recipe data */}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                {selectedRecipe?.description || 'Recipe description here.'}
                            </Typography>
                            <div className='flex flex-col gap-4 mt-[10%]'>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        bgcolor: "#FF6216",
                                        "&:hover": {
                                            bgcolor: "#E55A12",
                                        },
                                    }}
                                    onClick={() => navigate(`/user/recipe/${selectedRecipe?._id}`)}
                                >
                                    View Recipe
                                </Button>
                                <Button
                                    fullWidth
                                    sx={{
                                        border: '1px solid #E55A12',
                                        padding: '5px',
                                        fontSize: '13px',
                                        color: '#E55A12',
                                        '&:hover': {
                                            bgcolor: '#E55A12',
                                            color: 'white',
                                        },
                                    }}
                                    onClick={() => handleAddOpenDialog(selectedRecipe)}
                                >
                                    + Add to Collcetion
                                </Button>
                            </div>
                            <p className='flex items-center justify-center mt-[10%] hover:text-primary hover:cursor-pointer' onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                handleOpenDialog(selectedRecipe); // Open confirmation dialog
                            }}><MdOutlineDelete /><span>Remove From Saved Recipes</span></p>
                        </Box>
                    </Box>
                </Dialog>


                <ConfirmationDialog
                    open={open}
                    title="Confirm Removal"
                    message={`Are you sure you want to remove this recipe from your favorites?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCloseDialog}
                />
                {selectedRecipe && (
                    <AddCollectionDialog
                        open={openAddDialog}
                        onClose={handleAdddDialogClose}
                        recipe={selectedRecipe}
                    />
                )}
            </Paper>
        </div>
    );
};

export default SavedRecipes;
