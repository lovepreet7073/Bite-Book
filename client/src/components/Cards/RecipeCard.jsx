import React from 'react';
import { CardMedia } from '@mui/material';
import BasicRating from './Rating'; // Assuming you have a custom Rating component
import { API_BASE_URL } from '../../config/apiUrl'; // Assuming you have API_BASE_URL defined
import { useNavigate } from 'react-router-dom';
export default function RecipeReviewCard({ recipe }) {
    console.log(recipe, "recipeIDDDD")
    const navigate = useNavigate();

    return (
        <div className=' hover:cursor-pointer w-[23rem] hover:shadow-xl' onClick={() => navigate(`/user/recipe/${recipe._id}`)}>
            <div key={recipe._id} className="mb-4 flex flex-col gap-2">
                {/* Recipe Image */}
                {recipe.imageUrl && (
                    <CardMedia
                        component="img"
                        height="13rem"
                        image={`${API_BASE_URL}/images/${recipe.imageUrl}`}
                        alt={recipe.title}
                        sx={{
                            height: '13rem',
                            width: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            borderRadius: '2px',
                        }}
                    />
                )}

                {/* Recipe Title and Cuisine */}
                <div className='px-1'>
                    <h3 className='font-bold text-xs text-neutral-400 tracking-wider mt-1'>
                        {recipe.cuisine.toUpperCase()} {/* Displaying cuisine */}
                    </h3>
                    <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                        sx={{
                            transition: 'underline 0.3s ease',
                            '&:hover': {
                                textDecoration: 'underline', // Underline on hover
                            }
                        }}
                    >
                        {recipe.title} {/* Recipe Title */}
                    </h5>
                </div>

                {/* Recipe Rating */}
                <div disableSpacing className='p-0 flex items-center gap-1'>
                    <BasicRating /> {/* Custom Rating Component */}
                    <p className='text-sm text-slate-500'>{recipe.ratings || 'No ratings yet'}</p> {/* Display number of ratings */}
                </div>
            </div>
        </div>
    );
}
