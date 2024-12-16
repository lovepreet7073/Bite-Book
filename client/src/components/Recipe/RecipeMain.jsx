import React from 'react';
import { useSelector } from 'react-redux';
import RecipeReviewCard from '../Cards/RecipeCard';

const RecipeMain = () => {
  const { recipe } = useSelector((store) => store);
  return (
    <div className='flex flex-col justify-center items-center px-10 py-6 lg:mb-[10%]'>
      <section>
        {recipe?.allRecipes && recipe.allRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
            {recipe?.allRecipes?.map((item) => (
              <RecipeReviewCard key={item?._id} recipe={item} />
              // Pass individual recipe to RecipeReviewCard
            ))}
          </div>
        ) : (
          <div className='flex justify-center  min-h-screen mt-[40%]'>
            <p className='text-gray-600 text-xl'>No recipes found. Please check back later!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default RecipeMain;
