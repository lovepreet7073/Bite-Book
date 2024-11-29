import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import {
    Menu,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteCollection } from '../../redux/Collection/Actions';
import EmptyCollection from './EmptyCollection';
import CollectionDialog from './CollectionDialog'; // Import the dialog component
import { API_BASE_URL } from '../../config/apiUrl';
const CollectionRecipes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const collectionData = location?.state?.collectionData;
    console.log(collectionData, "collectiondata")
    // State for menu, dialog, and editing
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDeleteDialogOpen = () => {
        setIsDeleteDialogOpen(true);
        handleMenuClose(); // Close the menu
    };
    const handleDeleteDialogClose = () => setIsDeleteDialogOpen(false);
    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
        handleMenuClose(); // Close the menu
    };
    const handleEditDialogClose = () => setIsEditDialogOpen(false);

    // Confirm and dispatch remove action
    const confirmRemove = async () => {
        try {
            await dispatch(deleteCollection(collectionData._id));
            setIsDeleteDialogOpen(false);
            navigate('/user/profile'); // Navigate back to profile
        } catch (err) {
            console.error("Error deleting collection:", err.message);
        }
    };

    if (!collectionData) {
        return <div>No collection data found</div>;
    }

    return (
        <div>
            {/* Header Section */}
            <div className='bg-neutral-100 w-full h-[23%]'>
                <div className='flex items-center gap-[20%] px-[60px] py-[10px] justify-around'>
                    <IoIosArrowBack
                        size={30}
                        className='text-primary cursor-pointer'
                        title='Back'
                        onClick={() => navigate('/user/profile')} // Navigate back to the previous page
                    />

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-bold text-gray-800 mt-5'>{collectionData?.name}</h1>
                        <p className='text-md text-gray-600'>{collectionData?.description}</p>
                        <p className='text-sm text-gray-900'>{collectionData?.recipes?.length} Recipes</p>
                    </div>

                    {/* Dots Icon with Dropdown */}
                    <BsThreeDots
                        className='mr-[20px] cursor-pointer text-primary'
                        size={21}
                        onClick={handleMenuOpen} // Open dropdown menu
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
                            Remove Collection
                        </MenuItem>
                    </Menu>
                </div>
            </div>

            {/* Display Recipes */}
            <div className={collectionData?.recipes?.length > 0 ? "grid grid-cols-1 md:grid-cols-3 gap-6 px-[16%] py-[5%]" : "flex items-center justify-center h-screen"}>
                {
                    collectionData?.recipes?.length > 0 ? (
                        collectionData?.recipes?.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="hover:cursor-pointer w-[18rem] px-2 py-4"
                                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2 border">
                                    <div className="h-[13rem]">
                                        <img
                                            className="h-full w-full object-cover object-top"
                                            src={`${API_BASE_URL}/images/${recipe.imageUrl[0]}`} // Use the first image from the array
                                            alt={recipe.title}
                                        />
                                    </div>
                                    <div className="px-1 bg-white flex justify-between">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words">
                                            {recipe.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <EmptyCollection />
                    )
                }
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={isDeleteDialogOpen}
                onClose={handleDeleteDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete the collection "{collectionData?.name}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={confirmRemove}
                        sx={{
                            bgcolor: "#FF6216",
                            color: 'white',
                            marginTop: 1,
                            "&:hover": {
                                bgcolor: "#E55A12",
                            },
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit Collection Dialog */}
            <CollectionDialog
                open={isEditDialogOpen}
                onClose={handleEditDialogClose}
                initialData={collectionData} // Pass the current collection data
            />
        </div>
    );
};

export default CollectionRecipes;
