import React, { useEffect } from 'react'
import { ImSpoonKnife } from "react-icons/im";
import RecipeReviewCard from '../Cards/RecipeCard'
import TrendingCard from '../Cards/TrendingCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecipes } from '../../redux/Recipe/Actions';
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const dispatch = useDispatch()
  const { recipe } = useSelector(store => store)
  const navigate = useNavigate();
  console.log(recipe, "recipe-home")
  useEffect(() => {
    // Dispatch the GetRecipes action when the component mounts
    dispatch(GetRecipes());
  }, [dispatch]);



  return (
    <div className='flex flex-col justify-center items-center lg:px-8 lg:py-3'>
      <section className='mb-3'>
        <div className='flex justify-between  lg:p-4 items-center'>
          <h1 className='mt-3 mb-2 text-4xl font-bold text-slate-700 flex items-center gap-2 '>
            Recipes
            <span><ImSpoonKnife size={22} className='text-[#FF6216]' /></span>
          </h1>
          <FaArrowRight className='text-black hover:text-secondary hover:cursor-pointer hover:scale-x-110 transition-transform duration-300 ease-in-out' size={30} title='recipes' onClick={() => navigate('/user/recipes')} />
        </div>
        {/* Grid Layout for Recipes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
          {recipe?.allRecipes && recipe.allRecipes.length > 0 ? (
            recipe.allRecipes.slice(0, 3).map((item) => ( // Limit the number of recipes to 3
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