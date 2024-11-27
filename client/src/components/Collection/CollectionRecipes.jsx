import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { Menu, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiUrl';
const CollectionRecipes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const collectionData = location?.state?.collectionData;
    console.log(collectionData, "collectionData");

    // State to manage dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Event handlers for menu
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Actions
    const handleEditDetails = () => {
        handleMenuClose();
        // Navigate to the edit page or open a modal
        console.log("Edit details clicked");
    };

    const handleRemoveCollection = () => {
        handleMenuClose();
        // Trigger the remove action
        console.log("Remove collection clicked");
    };

    if (!collectionData) {
        return <div>No collection data found</div>;
    }

    return (
        <div className='h-screen'>
            <div className='bg-neutral-100 w-full h-[23%]'>
                <div className='flex items-center gap-[20%] px-[60px] py-[10px] justify-around'>
                    <IoIosArrowBack
                        size={30}
                        className='text-primary cursor-pointer'
                        title='Back'
                        onClick={() => navigate(-1)} // Navigate back to the previous page
                    />

                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-bold text-gray-800 mt-5'>{collectionData?.name}</h1>
                        <p className='text-md text-gray-600'>{collectionData?.description}</p>
                        <p className='text-sm text-gray-900  '>{collectionData?.recipes?.length} Recipes</p>
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
                        <MenuItem onClick={handleEditDetails}>Edit Details</MenuItem>
                        <MenuItem onClick={handleRemoveCollection}>Remove Collection</MenuItem>
                    </Menu>
                </div>
            </div>

            {/* Display Recipes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-[13%] py-[5%]">
                {
                    collectionData?.recipes?.length > 0 ? (
                        collectionData?.recipes?.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="hover:cursor-pointer w-[16rem] px-2 py-4 "
                                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2 border">
                                    <div className="h-[13rem]">
                                        {/* Handle imageUrl being an array */}
                                        <img
                                            className="h-full w-full object-cover object-top"
                                            src={`${API_BASE_URL}/images/${recipe.imageUrl[0]}`} // Use the first image from the array
                                            alt={recipe.title}
                                        />
                                    </div>

                                    {/* Recipe Title */}
                                    <div className="px-1 bg-white flex justify-between">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words w-48">
                                            {recipe.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No recipes available.</p>
                    )
                }
            </div>
        </div>
    );
};

export default CollectionRecipes;
