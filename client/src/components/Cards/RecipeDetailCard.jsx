import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findRecipeById } from '../../redux/Recipe/Actions';
import { API_BASE_URL } from '../../config/apiUrl';
import moment from 'moment';
import revealElements from '../../scrollReveal';
import Carousel from '../Carousel'; // Import your Carousel component

const RecipeDetailCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { recipe } = useSelector(store => store);
    console.log(recipe, "details");

    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        const data = { recipeId: params?.recipeId };
        console.log(data, "data");
        dispatch(findRecipeById(data, token));
    }, [params?.recipeId]);

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    <div className=" rounded-lg max-w-[430rem] max-h-[89rem]">
                        {/* Carousel for Recipe Images */}
                        <Carousel data={recipe?.recipe?.imageUrl || []} /> {/* Use your images array */}
                    </div>

                    <div className="lg:col-span-1 max-auto right max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2">
                            <h1 className="text-xl lg:text-4xl font-bold text-gray-900 tracking-wider mb-2">{recipe?.recipe?.title}</h1>
                            <h1 className="text-lg lg:text-xl font-normal text-gray-900 mt-4 tracking-wider leading-18">{recipe?.recipe?.description}</h1>
                            <h1 className='text-lg lg:text-lg text-slate-700 opacity-70 pt-1 mt-4'>
                                By {recipe?.recipe?.userId?.fullName} | {moment(recipe?.recipe?.createdAt).format('MMMM D, YYYY')}
                            </h1>
                        </div>

                        {/* Ingredients and Directions Section */}
                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Ingredients */}
                            <div>
                                <h3 className="text-3xl font-medium text-gray-900">Ingredients</h3>
                                <div className="space-y-4 mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-lg">
                                        {recipe?.recipe?.ingredients?.map((ingredient, index) => (
                                            <li key={index} className="text-gray-400 mt-2">
                                                <span className="text-gray-600">{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-4 lg:row-span-3 lg:mt-0">
                                <div className="flex items-center text-lg space-x-5 lg:text-xl text-gray-900 mt-6">
                                    <div
                                        className="p-4 border rounded-lg border-gray-300 shadow-sm bg-white"
                                        style={{
                                            width: 'fit-content',
                                            backgroundColor: '#f9fafb',
                                            borderRadius: '8px',
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        <p className="font-semibold text-gray-900">
                                            Prep Time: {recipe?.recipe?.prepTime?.time + recipe?.recipe?.prepTime?.unit} | Cook Time: {recipe?.recipe?.cookTime?.time + recipe?.recipe?.cookTime?.unit}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Directions */}
                            <div className="mt-10">
                                <h3 className="text-3xl font-medium text-gray-900">Directions</h3>
                                <div className="space-y-4 mt-4">
                                    <ol className="list-decimal pl-6 text-lg text-gray-600">
                                        {recipe?.recipe?.directions?.map((direction, index) => (
                                            <li key={index} className="text-gray-600 mt-2">
                                                {direction}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                <p>{recipe?.notes}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetailCard;
