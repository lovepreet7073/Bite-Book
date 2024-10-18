import React from 'react'
import revealElements from '../../scrollReveal';
import { useEffect } from 'react';
import './recipe.css'
const TrendingCard = () => {
    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, []);
    return (
        <div className='productcard'>
            <div className="flex flex-col items-center bg-white  productCard  rounded-sm  md:flex-row md:max-w-xl hover:cursor-pointer"
        >
            <img
                className="object-cover    md:h-auto md:w-48 w-full "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHi7GCv2HdNaNwaXEd9tYGW3gvnD3QBlDHkw&s"
                alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal textpart bg-white">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Creamy Garlic Parmesan Pasta
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">
                    This indulgent pasta dish is creamy, rich, and full of flavor. With a simple garlic Parmesan sauce, it's perfect for a weeknight dinner that’s both quick and satisfying.
                </p>
            </div>
        </div>
        </div>
    )
}

export default TrendingCard