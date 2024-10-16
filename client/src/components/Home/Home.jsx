import React, { useEffect } from 'react'
import { ImSpoonKnife } from "react-icons/im";
import RecipeReviewCard from '../Cards/RecipeCard'
import TrendingCard from '../Cards/TrendingCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecipes } from '../../redux/Recipe/Actions';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch()
  const {recipe} = useSelector(store=>store)
  console.log(recipe,"recipe-home")
  useEffect(() => {
    // Dispatch the GetRecipes action when the component mounts
    dispatch(GetRecipes());
  }, [dispatch]);
  return (
    <div className='flex flex-col justify-center items-center px-8 py-3'>
      <section className='mb-3'>
        <h1 className='mt-3 mb-2 text-4xl font-bold text-slate-700 flex items-center gap-2 ml-[1%]'>
          Recipes
          <span><ImSpoonKnife size={22} className='text-[#FF6216]' /></span>
        </h1>

        {/* Grid Layout for Recipes */}
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

      <hr className='w-full py-2 mt-5 mb-2' />

      <section className='mb-3 px-8'>
        <h1 className='mt-3 mb-8 text-4xl font-bold text-slate-700 flex items-center gap-2 ml-[1%]'>
          Explore Recipes
          <span><ImSpoonKnife size={22} className='text-[#FF6216]' /></span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-0">
          {[1, 1, 1, 1].map((item, index) => (
            <TrendingCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>


  )
}

export default Home