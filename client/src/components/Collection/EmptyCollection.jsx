import {  Button } from '@mui/material';
import React from 'react'
import image from '../../assets/images/box.jpg';
import { useNavigate } from 'react-router-dom'
const EmptyCollection = () => {
    const navigate = useNavigate();
    return (
        <div className='-mt-[15%]'>
            <div className="flex flex-col items-center justify-center gap-4">
                <img
                    src={image}
                    alt="collection-image"
                    className="h-[16rem] w-[16rem]"
                />
                <h1 className="text-3xl font-bold">This collection is empty</h1>
                <h5 className="text-gray-800 text-center">
                    You can organize recipes that you've already saved, or  <br /> add recipes to a collection the moment that you save them.
                </h5>
                <Button
                    variant="contained"
                    onClick={() => navigate('/user/profile')}
                    sx={{
                        bgcolor: '#FF6216',
                        padding: '8px',
                        fontSize: '14px',
                        '&:hover': {
                            bgcolor: '#E55A12',
                        },
                    }}
                >
                    View All Saved Recipes
                </Button>
            </div>
        </div>
    )
}

export default EmptyCollection