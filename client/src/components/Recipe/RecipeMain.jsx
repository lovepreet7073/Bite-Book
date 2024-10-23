import React from 'react'
import { useSelector } from 'react-redux'
import RecipeReviewCard from '../Cards/RecipeCard'
const RecipeMain = () => {
  const {recipe}  =useSelector(store=>store)
console.log(recipe.allRecipes,"AllRceipes")
  
  return (
    <div className='flex flex-col justify-center items-center px-10 py-6 lg:mb-[10%]'>
      <section>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
          {recipe?.allRecipes && recipe.allRecipes.length > 0 ? (
            recipe.allRecipes.map((item) => (
              <RecipeReviewCard key={item._id} recipe={item} /> // Pass individual recipe to RecipeReviewCard
            ))
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default RecipeMain