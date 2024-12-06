import React, { useState, useEffect } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { Menu, MenuItem, Button, } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollection, findCollectionById, removeRecipeFromCollection } from '../../redux/Collection/Actions';
import EmptyCollection from './EmptyCollection';
import CollectionDialog from './CollectionDialog';
import { API_BASE_URL } from '../../config/apiUrl';
import ConfirmationDialog from '../Shared/ConfirmationDialog';

const CollectionRecipes = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isRecipeDialogOpen, setIsRecipeDialogOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { collection } = useSelector(store => store);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(true);
        handleMenuClose();
    };
    const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);

    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
        handleMenuClose();
    };
    const handleEditDialogClose = () => setIsEditDialogOpen(false);

    const handleRecipeDialogOpen = (recipe) => {
        setSelectedRecipe(recipe); // Set the selected recipe for removal
        setIsRecipeDialogOpen(true);
    };

    const handleRecipeDialogClose = () => {
        setSelectedRecipe(null);
        setIsRecipeDialogOpen(false);
    };

    const confirmRemove = async () => {
        try {
            await dispatch(deleteCollection(collection?.collection?._id));
            setIsDeleteDialogOpen(false);
            navigate('/user/profile'); // Navigate back to profile
        } catch (err) {
            console.error("Error deleting collection:", err.message);
        }
    };

    const confirmRemoveRecipe = async () => {
        if (!selectedRecipe) return;
        try {
            console.log(collection?.collection?._id, selectedRecipe?._id, "collection?.collection?._id, selectedRecipe?._id")
            await dispatch(removeRecipeFromCollection(collection?.collection?._id, selectedRecipe?._id));
            handleRecipeDialogClose();
        } catch (err) {
            console.error("Error removing recipe:", err.message);
        }
    };

    // Fetch collection data on component mount
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        dispatch(findCollectionById({ collectionId: id }, token)); // Match the key to the function
    }, [dispatch, id]);

    if (!collection?.collection) {
        return <div>No collection data found</div>;
    }

    return (
        <div>
            {/* Header Section */}
            <div className="bg-neutral-100 w-full h-[23%]">
                <div className="flex items-center gap-[7%] px-[60px] py-[10px] justify-around">
                    <IoIosArrowBack
                        size={30}
                        className="text-primary cursor-pointer"
                        title="Back"
                        onClick={() => navigate('/user/profile')}
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-gray-800 mt-5">{collection?.collection?.name}</h1>
                        <p className="text-md text-gray-600">{collection?.collection?.description}</p>
                        <p className="text-sm text-gray-900">
                            {collection?.collection?.recipes?.length === 1
                                ? '1 Recipe'
                                : `${collection?.collection?.recipes?.length} Recipes`}
                        </p>
                    </div>
                    <BsThreeDots
                        className="mr-[20px] cursor-pointer text-primary"
                        size={21}
                        onClick={handleMenuOpen}
                    />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        sx={{ marginTop: '20px' }}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleEditDialogOpen}>
                            Edit Details
                        </MenuItem>

                        <MenuItem onClick={handleDeleteDialogOpen}>
                            Delete Collection
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            {/* Display Recipes */}
            <div
                className={
                    collection?.collection?.recipes?.length > 0
                        ? "grid grid-cols-1 md:grid-cols-3 gap-6 px-[16%] py-[5%]"
                        : "flex items-center justify-center h-screen"
                }
            >
                {collection?.collection?.recipes?.length > 0 ? (
                    collection?.collection.recipes.map((recipe) => (
                        <div
                            key={recipe._id}
                            className="hover:cursor-pointer w-[18rem] px-2 py-4 relative"
                        >
                            <div className="mb-4 flex flex-col gap-2 border">
                                <div className="h-[13rem]">
                                    <img
                                        className="h-full w-full object-cover object-top"
                                        src={`${API_BASE_URL}/images/${recipe?.imageUrl[0]}`}
                                        alt={recipe.title}
                                    />
                                </div>
                                <div className="px-1 bg-white flex justify-between">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words">
                                        {recipe.title}
                                    </h5>
                                    <Button
                                        onClick={() => handleRecipeDialogOpen(recipe)}
                                        color="error"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyCollection />
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmationDialog
                open={isDeleteDialogOpen}
                title="Confirm Deletion"
                message={`Are you sure you want to delete the collection "${collection?.collection?.name}"? This action cannot be undone.`}
                onConfirm={confirmRemove}
                onCancel={handleDeleteDialogClose}
            />

            {/* Recipe Remove Confirmation Dialog */}
            <ConfirmationDialog
                open={isRecipeDialogOpen}
                title="Remove Recipe"
                message={`Are you sure you want to remove the recipe "${selectedRecipe?.title}" from this collection?`}
                onConfirm={confirmRemoveRecipe}
                onCancel={handleRecipeDialogClose}
            />

            {/* Edit Collection Dialog */}
            <CollectionDialog
                open={isEditDialogOpen}
                onClose={handleEditDialogClose}
                initialData={collection?.collection}
            />
        </div>
    );
};

export default CollectionRecipes;
