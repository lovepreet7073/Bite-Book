import { Paper, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RecipeCardSkeleton from '../Shared/RecipeCardSkeleton '
const Collectionlist = () => {
    const { collection } = useSelector(store => store)
    const navigate = useNavigate()
    return (
        <div>


            <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 mt-[1%]">
                {collection.isLoading ? (
                    <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-5">
                        {Array.from({ length: 6 }).map((_, idx) => (
                            <RecipeCardSkeleton key={idx} />
                        ))}
                    </div>
                ) : collection?.allCollection?.length > 0 ? (
                    collection?.allCollection.map((item) => {


                        return (
                            <div
                                key={item._id}
                                className="hover:cursor-pointer w-[16rem] px-2 py-4"
                                onClick={() => navigate(`/user/collection/${item._id}`, { state: { collectionData: item } })}


                            >
                                <div className="mb-4 flex flex-col gap-2 border">
                                    <div className="h-[13rem]">
                                        <img
                                            className="h-full w-full object-cover object-top"
                                            //  src={`${API_BASE_URL}/images/${imageUrl}`}
                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPp10aHkpxqVtEbAG2h4KEej6q1hPmr_W0o5FIVCnArdPHlScfOtMz7thYLsHuGxS7YJk&usqp=CAU'
                                        //  alt={recipe.title}
                                        />
                                    </div>

                                    {/* Recipe Title */}
                                    <div className="px-1 bg-white flex justify-between">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 break-words w-48">
                                            {item.name}
                                        </h5>


                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <Typography>No colllection found.</Typography>
                )}
            </div>


        </div>
    )
}

export default Collectionlist