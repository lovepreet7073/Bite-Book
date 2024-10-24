import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import BasicRating from './Rating';
import { API_BASE_URL } from '../../config/apiUrl';
import { useNavigate } from 'react-router-dom';
import './recipe.css';
import revealElements from '../../scrollReveal';
import { likeRecipe } from '../../redux/Recipe/Actions';
import showCustomToast from '../../components/ToastComponent'; // Import your custom toast function

export default function RecipeReviewCard({ recipe }) {
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        revealElements();
    }, []);

    useEffect(() => {
        if (recipe?.likedBy?.includes(auth?.user?._id)) {
            setIsLiked(true);
        } else {
            setIsLiked(false);
        }
    }, [recipe, auth]);

    const handleLikeClick = (event) => {
        event.stopPropagation();
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        dispatch(likeRecipe(recipe?._id, auth?.user?._id));

        // Show custom toast notification with different icons
        const message = newIsLiked ? 'You liked  this recipe!' : 'You unliked this recipe!';
        const type = newIsLiked ? 'success' : 'info'; // You can choose the type based on your preference
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
                    <div className='lg:h-[15rem] '>
                        <img className='h-full imghover w-full object-cover object-top' src={firstImageUrl} alt={recipe.title} />
                    </div>
                )}

                {/* Recipe Title and Cuisine */}
                <div className='px-1 textpart bg-white'>
                    <h3 className='font-bold text-xs text-neutral-400 tracking-wider mt-1'>
                        {recipe.cuisine.toUpperCase()}
                    </h3>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {recipe.title}
                    </h5>
                </div>

                {/* Like Button */}
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

                {/* Recipe Rating */}
                <div disableSpacing className='p-0 flex items-center gap-1'>
                    <BasicRating />
                    <p className='text-sm text-slate-500'>{recipe.ratings || 'No ratings yet'}</p>
                </div>
            </div>
        </div>
    );
}
