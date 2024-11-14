import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/apiUrl';
import { likeRecipe } from '../../redux/Recipe/Actions';
import showCustomToast from '../Shared/ToastComponent';
import Rating from '@mui/material/Rating';

export default function RecipeReviewCard({ recipe }) {
    const [isLiked, setIsLiked] = useState(false);
    const [value, setValue] = React.useState(2);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const token = localStorage.getItem('jwt');
    console.log(auth, "auth")
    useEffect(() => {
        if (auth?.userFavorites?.some(favRecipe => favRecipe._id === recipe._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [auth?.userFavorites, recipe?._id]);

    useEffect(() => {
        if (recipe?.reviews?.length > 0) {
            const averageRating = recipe.reviews.reduce((acc, review) => acc + review.rating, 0) / recipe.reviews.length;
            setValue(averageRating);
        } else {
            setValue(0);
        }
    }, [recipe]);

    const handleLikeClick = (event) => {
        event.stopPropagation();
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        dispatch(likeRecipe(recipe?._id, auth?.user?._id));
        const message = newIsLiked ? 'Recipe added to favorites!' : 'Recipe removed from favorites!';
        const type = newIsLiked ? 'success' : 'info';
        showCustomToast(message, type);
    };

    const firstImageUrl = recipe.imageUrl?.[0] ? `${API_BASE_URL}/images/${recipe.imageUrl[0]}` : null;

    return (
        <div
            title={!token ? 'Log in to access the recipe!' : ''}
            className='hero-title productCard hover:cursor-pointer w-[23rem]'
            onClick={() => navigate(`/user/recipe/${recipe._id}`)}
        >
            <div key={recipe._id} className="mb-4 flex flex-col gap-2">
                {firstImageUrl && (
                    <div className='lg:h-[15rem] h-[13rem]'>
                        <img className='h-full imghover w-full object-cover object-top' src={firstImageUrl} alt={recipe.title} />
                    </div>
                )}

                <div className='px-1 textpart bg-white'>
                    <h3 className='font-bold text-xs text-neutral-400 tracking-wider mt-1'>
                        {recipe.cuisine.toUpperCase()}
                    </h3>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        {recipe.title}
                    </h5>
                </div>

                <div
                    title={!token ? 'Log in to like the recipe!' : ''}
                    className='w-10 h-10 bg-primary rounded-full top-[1%] right-[1%] flex justify-center items-center absolute hover:bg-secondary'
                    onClick={token ? handleLikeClick : null}
                >
                    {isLiked ? (
                        <FaHeart className='text-white' size={20} />
                    ) : (
                        <FaRegHeart className='text-white' size={20} />
                    )}
                </div>

                <div disableSpacing className='p-0 flex items-center gap-1'>
                    <Rating name="disabled" value={value} readOnly />
                    <p className='text-sm text-slate-500'>
                        {recipe?.reviews?.length
                            ? `${recipe.reviews.length} ${recipe.reviews.length === 1 ? 'rating' : 'ratings'}`
                            : 'No ratings yet'}
                    </p>
                </div>
            </div>
        </div>
    );
}
