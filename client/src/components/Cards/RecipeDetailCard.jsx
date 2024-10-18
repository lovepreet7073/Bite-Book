import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { findRecipeById } from '../../redux/Recipe/Actions';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/apiUrl';
import moment from 'moment';
import revealElements from '../../scrollReveal';
  
const RecipeDetailCard = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { recipe } = useSelector(store => store)
    console.log(recipe, "detils");
    useEffect(() => {
        revealElements(); // Initialize ScrollReveal
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('jwt')
        const data = { recipeId: params?.recipeId }
        console.log(data, "data")
        dispatch(findRecipeById(data,token))

    }, [params?.recipeId])



    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                {/* <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <li >
                            <div className="flex items-center">
                                <a href='#' className="mr-2 text-lg font-medium text-gray-900">

                                </a>
                                <svg
                                    fill="currentColor"
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li className="text-sm">
                            <a href= '#'aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                       
                            </a>
                        </li>
                    </ol>
                </nav> */}

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[430rem] max-h-[89rem] left">
                            <img
                                src={`${API_BASE_URL}/images/${recipe?.recipe?.imageUrl}`}
                                className="h-full w-full object-cover object-center"
                            // alt={product.title}
                            />
                        </div>





                    </div>

                    <div className="lg:col-span-1 max-auto  right max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-xl lg:text-4xl font-bold text-gray-900 tracking-wider mb-2">{recipe?.recipe?.title}</h1>
                            <h1 className="text-lg lg:text-xl font-normal text-gray-900 mt-4 tracking-wider  leading-18">{recipe?.recipe?.description}</h1>
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
                            </div>
                        </div>


                    </div>
                </section>
            </div>
        </div>
    );
};

export default RecipeDetailCard;
