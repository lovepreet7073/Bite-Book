import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'
import { API_BASE_URL } from '../../config/apiUrl'

const SavedRecipes = () => {
    const { auth } = useSelector(store => store)
    const navigate = useNavigate();
console.log(auth,"userFavorites")
    return (
        <div>
          <h1 className='text-3xl font-bold'>Recently Saved Recipes</h1>
            <div className="grid lg:grid-cols-3 gap-4 mt-[5%]">
                {auth?.userFavorites?.length > 0 ? (
                    auth?.userFavorites.map((recipe) => {
                        // Check if imageUrl is an array and select the first image if so
                        const imageUrl = Array.isArray(recipe.imageUrl) 
                            ? recipe.imageUrl[0] 
                            : recipe.imageUrl;

                        return (
                            <div
                                key={recipe._id}
                                className="hover:cursor-pointer w-[16rem] px-2 py-4"
                                onClick={() => navigate(`/user/recipe/${recipe._id}`)}
                            >
                                <div className="mb-4 flex flex-col gap-2">
                                    <div className="h-[13rem]">
                                        <img
                                            className="h-full w-full object-cover object-top"
                                            src={`${API_BASE_URL}/images/${imageUrl}`} // Use the first image in array or single image
                                            alt={recipe.title}
                                        />
                                    </div>

                                    {/* Recipe Title */}
                                    <div className="px-1 bg-white">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                            {recipe.title}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Typography>No recipes found.</Typography>
                )}
            </div>
        </div>
    )
}

export default SavedRecipes
