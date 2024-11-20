import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/apiUrl';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography,Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import showCustomToast from '../../components/Shared/ToastComponent';
import { DeleteRecipe, userRecipes } from '../../redux/Recipe/Actions';
import RecipeCardSkeleton from '../../components/Shared/RecipeCardSkeleton ';

const UserRecipes = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recipe, auth } = useSelector((store) => store);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const token = localStorage.getItem('jwt');
    const userId = auth?.user?._id;
    const isLoading = recipe.isLoading;

    const handleDeleteClick = (event, recipeId) => {
        event.stopPropagation();
        setSelectedRecipeId(recipeId);
        setOpenDialog(true);
    };

    const handleConfirmDelete = () => {
        dispatch(DeleteRecipe(selectedRecipeId))
            .then(() => {
                showCustomToast('Recipe deleted successfully', 'success');
                setOpenDialog(false);
                dispatch(userRecipes(userId, token));
            })
            .catch((err) => {
                showCustomToast('Failed to delete recipe', 'error');
                setOpenDialog(false);
            });
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    const handleEdit = (event, recipeData) => {
        event.stopPropagation();
        navigate(`/user/edit-recipe/${recipeData._id}`, { state: { recipe: recipeData } });
    };

    return (
        <div>
             <div>
             <Paper elevation={3} className="p-5 lg:mb-[18%]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="lg:text-3xl text-xl font-bold">Bite Book Personal Recipes</h1>
                        <p className="text-md text-gray-400 mt-4">Recipes you have created on Bite Book.</p>
                    </div>
                    <Button
                        onClick={() => navigate('/user/add-recipe')}
                        variant="contained"
                        sx={{
                            bgcolor: '#FF6216',
                            '&:hover': {
                                bgcolor: '#E55A12',
                            },
                        }}
                    >
                        Add a recipe
                    </Button>
                </div>
                <hr className="w-full mt-2 mb-2" />
                {isLoading ? (
                   <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
                   {Array.from({ length: 6 }).map((_, idx) => (
                       <RecipeCardSkeleton key={idx} />
                   ))}
               </div>
                ) : recipe?.userRecipes?.length > 0 ? (
                    <div className="grid lg:grid-cols-3 mt-[5%]">
                        {recipe.userRecipes.map((recipeItem) => (
                            <div
                                key={recipeItem._id}
                                className="relative hero-title hover:cursor-pointer w-[16rem] px-2 py-4"
                                onClick={() => navigate(`/user/recipe/${recipeItem._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2">
                                    {Array.isArray(recipeItem.imageUrl) && recipeItem.imageUrl.length > 0 ? (
                                        <div className="h-[13rem] group">
                                            <img
                                                className="h-full imghover w-full object-cover object-top transition duration-300 group-hover:blur-sm"
                                                src={`${API_BASE_URL}/images/${recipeItem.imageUrl[0]}`}
                                                alt={recipeItem.title}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40 h-full">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={(event) => handleEdit(event, recipeItem)}
                                                        sx={{
                                                            border: '1px solid #E55A12',
                                                            padding: '4px',
                                                            fontSize: '12px',
                                                            color: '#E55A12',
                                                            '&:hover': {
                                                                bgcolor: '#E55A12',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={(event) => handleDeleteClick(event, recipeItem._id)}
                                                        sx={{
                                                            bgcolor: '#FF6216',
                                                            padding: '4px',
                                                            fontSize: '12px',
                                                            '&:hover': {
                                                                bgcolor: '#E55A12',
                                                            },
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : recipeItem.imageUrl && (
                                        <div className="h-[13rem] group">
                                            <img
                                                className="h-full imghover w-full object-cover object-top transition duration-300 group-hover:blur-sm"
                                                src={`${API_BASE_URL}/images/${recipeItem.imageUrl}`}
                                                alt={recipeItem.title}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40 h-full">
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outlined"
                                                        onClick={(event) => handleEdit(event, recipeItem)}
                                                        sx={{
                                                            border: '1px solid #E55A12',
                                                            padding: '4px',
                                                            fontSize: '12px',
                                                            color: '#E55A12',
                                                            '&:hover': {
                                                                bgcolor: '#E55A12',
                                                                color: 'white',
                                                            },
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        onClick={(event) => handleDeleteClick(event, recipeItem._id)}
                                                        sx={{
                                                            bgcolor: '#FF6216',
                                                            padding: '4px',
                                                            fontSize: '12px',
                                                            '&:hover': {
                                                                bgcolor: '#E55A12',
                                                            },
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="px-1 bg-white">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                            {recipeItem.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Typography>No recipes found.</Typography>
                )}
                <Dialog
                    open={openDialog}
                    onClose={handleCancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this recipe?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            variant="contained"
                            sx={{
                                bgcolor: '#FF6216',
                                '&:hover': {
                                    bgcolor: '#E55A12',
                                },
                            }}
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                </Paper>
            </div>
        </div>
    );
};

export default UserRecipes;
