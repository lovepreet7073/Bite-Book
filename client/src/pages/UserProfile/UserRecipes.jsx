import React from 'react'
import { API_BASE_URL } from '../../config/apiUrl';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import showCustomToast from '../../components/ToastComponent';
import { DeleteRecipe, userRecipes } from '../../redux/Recipe/Actions';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const UserRecipes = () => {
    const navigate = useNavigate();
    const { recipe, auth } = useSelector(store => store)
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);
    const dispatch = useDispatch();
    const token = localStorage.getItem('jwt');
    const userId = auth?.user?._id;
    const handleDeleteClick = (event, recipeId) => {

        console.log(event, recipeId)
        event.stopPropagation(); // Prevent navigating to the recipe
        setSelectedRecipeId(recipeId); // Store the recipe ID to be deleted
        setOpenDialog(true); // Open the confirmation dialog
    };
    const handleConfirmDelete = () => {
        dispatch(DeleteRecipe(selectedRecipeId))

        dispatch(userRecipes(userId, token))
            .then(() => {
                showCustomToast('Recipe deleted successfully', 'success');
                setOpenDialog(false);
            })

    };

    // useEffect(() => {


    // }, [userId, dispatch, recipe.deletedrecipe]);

    const handleCancelDelete = () => {
        setOpenDialog(false); // Close the dialog without deleting
    };


    const handleEdit = (event, recipeData) => {
        event.stopPropagation(); // Prevent navigating to the recipe
        navigate(`/user/edit-recipe/${recipeData._id}`, { state: { recipe: recipeData } }); // Pass recipe d
    };

    return (
        <div>
            <div className=''>
                {/* Render user's recipes */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold'>Bite Book Personal Recipes</h1>
                        <p className='text-md text-grey-400 mt-4'>Recipes you have created on Bite Book.</p>
                    </div>
                    <Button
                        type="text"
                        form="user-form"
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
                <hr className='w-full mt-2 mb-2' />
                <div className='grid lg:grid-cols-3 mt-[5%] '>
                    {recipe?.userRecipes?.length > 0 ? (
                        recipe.userRecipes.map((recipe, index) => (
                            <div
                                key={recipe._id}
                                className="relative hero-title hover:cursor-pointer w-[16rem] px-2 py-4"
                                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2">
                                    {Array.isArray(recipe.imageUrl) && recipe.imageUrl.length > 0 ? (
                                        <div className="h-[13rem] group">
                                            <img
                                                className="h-full imghover w-full object-cover object-top transition duration-300 group-hover:blur-sm"
                                                src={`${API_BASE_URL}/images/${recipe.imageUrl[0]}`} // Use the first image from the array
                                                alt={recipe.title}
                                            />
                                            {/* Overlay for buttons */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40 h-full">
                                                <div className="flex gap-2">
                                                    <Button variant='outlined' onClick={(event) => handleEdit(event, recipe)} sx={{
                                                        border: "1px solid #E55A12",
                                                        padding: '4px',
                                                        fontSize: '12px',
                                                        color: "#E55A12",
                                                        '&:hover': {
                                                            bgcolor: '#E55A12',
                                                            color: 'white',
                                                        },
                                                    }}>Edit</Button>
                                                    <Button variant='contained' onClick={(event) => handleDeleteClick(event, recipe._id)} sx={{
                                                        bgcolor: '#FF6216',
                                                        padding: '4px',
                                                        fontSize: '12px',
                                                        '&:hover': {
                                                            bgcolor: '#E55A12',
                                                        },
                                                    }}>Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : recipe.imageUrl && (
                                        <div className="h-[13rem] group">
                                            <img
                                                className="h-full imghover w-full object-cover object-top transition duration-300 group-hover:blur-sm"
                                                src={`${API_BASE_URL}/images/${recipe.imageUrl}`} // Use the single image string
                                                alt={recipe.title}
                                            />
                                            {/* Overlay for buttons */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-40 h-full">
                                                <div className="flex gap-2">
                                                    <Button variant='outlined' onClick={(event) => handleEdit(event, recipe)} sx={{
                                                        border: "1px solid #E55A12",
                                                        padding: '4px',
                                                        fontSize: '12px',
                                                        color: "#E55A12",
                                                        '&:hover': {
                                                            bgcolor: '#E55A12',
                                                            color: 'white',
                                                        },
                                                    }}>Edit</Button>
                                                    <Button variant='contained' onClick={(event) => handleDeleteClick(event, recipe._id)} sx={{
                                                        bgcolor: '#FF6216',
                                                        padding: '4px',
                                                        fontSize: '12px',
                                                        '&:hover': {
                                                            bgcolor: '#E55A12',
                                                        },
                                                    }}>Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recipe Title and Cuisine */}
                                    <div className="px-1 bg-white ">
                                        <h5
                                            className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                                            style={{ transition: 'underline 0.3s ease' }}
                                        >
                                            {recipe.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography>No recipes found.</Typography>
                    )}
                </div>
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
                        <Button onClick={handleConfirmDelete} variant='contained' sx={{
                            bgcolor: '#FF6216', // Use the primary color from Tailwind config
                            '&:hover': {
                                bgcolor: '#E55A12', // Change to secondary color from Tailwind config on hover
                            },
                        }} autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    )
}

export default UserRecipes