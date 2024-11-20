import React from 'react'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
const CollectionRecipes = () => {
    return (
        <div className='h-screen '>
            <div className='bg-neutral-100 w-full h-[28%] border-b border-primary'>
                <div className='flex items-center justify-between px-[60px] py-[10px]'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-bold text-gray-800 mt-5'>Collection Name</h1>
                        <p className='text-md text-gary-600'>Perfect recipes for when you're short on time but still want a delicious meal.</p>
                        <p className='text-md text-gray-900 font-semibold italic'>0 Recipes</p>
                    </div>
                    <PiDotsThreeOutlineVerticalFill className='mr-[20px] cursor-pointer text-primary' size={25} />
                </div>

            </div>
        </div>
    )
}

export default CollectionRecipes;