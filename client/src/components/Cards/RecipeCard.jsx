import React from 'react';
import { FaRegHeart } from "react-icons/fa";

import BasicRating from './Rating'; // Assuming you have a custom Rating component
import { API_BASE_URL } from '../../config/apiUrl'; // Assuming you have API_BASE_URL defined
import { useNavigate } from 'react-router-dom';
import './recipe.css'
import revealElements from '../../scrollReveal';
import { BiLike } from "react-icons/bi";
import { useEffect } from 'react';
export default function RecipeReviewCard({ recipe }) {
    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, [])
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt')
    const handleLikeClick = (event) => {
        event.stopPropagation(); // Prevent click from propagating to card


    };
    return (
        <>
            <div title={!token ? 'Log in to access the recipe!' : ''} className='hero-title productCard hover:cursor-pointer w-[23rem] ' onClick={() => navigate(`/user/recipe/${recipe._id}`)}>
                <div key={recipe._id} className="mb-4 flex flex-col gap-2">
                    {/* Recipe Image */}
                    {recipe.imageUrl && (
                        <div className='h-[15rem] '>
                            <img className='h-full imghover  w-full object-cover object-top' src={`${API_BASE_URL}/images/${recipe.imageUrl}`} />
                        </div>
                    )}

                    {/* Recipe Title and Cuisine */}
                    <div className='px-1 textpart bg-white'>
                        <h3 className='font-bold text-xs text-neutral-400 tracking-wider mt-1'>
                            {recipe.cuisine.toUpperCase()} {/* Displaying cuisine */}
                        </h3>
                        <h5
                            className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"

                        >
                            {recipe.title} {/* Recipe Title */}
                        </h5>
                    </div>
                    <div className='w-10 h-10 bg-primary rounded-full  top-[1%] right-[1%] flex justify-center items-center absolute' onClick={handleLikeClick}>

                        <FaRegHeart className='text-white ' size={20} />

                    </div>

                    {/* Recipe Rating */}
                    <div disableSpacing className='p-0 flex items-center gap-1'>
                        <BasicRating /> {/* Custom Rating Component */}
                        <p className='text-sm text-slate-500'>{recipe.ratings || 'No ratings yet'}</p> {/* Display number of ratings */}
                    </div>
                </div>
            </div>
        </>

    );
}
