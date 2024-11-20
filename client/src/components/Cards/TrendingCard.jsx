import React, { useEffect, useState } from 'react';
import revealElements from '../../scrollReveal';
import './recipe.css';
import { API_BASE_URL } from '../../config/apiUrl';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TrendingCard = ({ item }) => {
    const [value, setValue] = useState(2);
    const navigate = useNavigate();

    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, []);

    // Average rating function
    useEffect(() => {
        if (item?.reviews?.length > 0) {
            const averageRating = item.reviews.reduce((acc, review) => acc + review.rating, 0) / item.reviews.length;
            setValue(averageRating);
        } else {
            setValue(0);
        }
    }, [item]);

    const firstImageUrl = item.imageUrl?.[0] ? `${API_BASE_URL}/images/${item.imageUrl[0]}` : null;

    // Limit description to 100 characters
    const maxDescriptionLength = 200;
    const truncatedDescription =
        item?.description?.length > maxDescriptionLength
            ? item.description.slice(0, maxDescriptionLength) + '...'
            : item?.description;

    return (
        <div
            className="productcard p-[4%]"
            onClick={() => navigate(`/user/recipe/${item._id}`)}
        >
            <div className="flex flex-col items-center bg-white productCard rounded-sm md:flex-row md:max-w-xl hover:cursor-pointer">
                {/* Image */}
                <div className="lg:h-[15rem] h-[10rem] w-[20rem]">
                    <img
                        className="h-full imghover w-full object-cover object-top"
                        src={firstImageUrl}
                        alt={item.title}
                    />
                </div>

                {/* Recipe Info */}
                <div className="flex flex-col justify-between p-4 leading-normal textpart bg-white w-full">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {item?.title || 'Recipe Name'} {/* Dynamic Recipe Name */}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm tracking-tight">
                            {truncatedDescription || 'Recipe description not available.'} {/* Truncated Description */}
                        </p>
                    </div>

                    <div disableSpacing className="p-0 flex items-center gap-1">
                        <Rating name="disabled" value={value} readOnly />
                        <p className="text-sm text-slate-500">
                            {item?.reviews?.length
                                ? `${item.reviews.length} ${item.reviews.length === 1 ? 'rating' : 'ratings'}`
                                : 'No ratings yet'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrendingCard;
