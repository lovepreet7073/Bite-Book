import React, { useEffect } from 'react';
import { ImSpoonKnife } from "react-icons/im";
import RecipeReviewCard from '../Cards/RecipeCard';
import TrendingCard from '../Cards/TrendingCard';
import { useDispatch, useSelector } from 'react-redux';
import { GetRecipes, fetchPopularRecipes } from '../../redux/Recipe/Actions';
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'primereact/carousel';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RecipeCardSkeleton from '../Shared/RecipeCardSkeleton ';
const Home = () => {
  const dispatch = useDispatch();
  const { allRecipes, popularRecipes, isLoading } = useSelector(store => store.recipe);
  console.log(allRecipes, "allRecipes")
  const navigate = useNavigate();

  const responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
  ];

  useEffect(() => {
    dispatch(GetRecipes());
    dispatch(fetchPopularRecipes());
  }, [dispatch]);

  const trendingCardTemplate = (item) => {
    return <TrendingCard key={item._id} item={item} />;
  };

  return (
    <div className='flex flex-col justify-center items-center lg:px-8 lg:py-3'>
      <section className='mb-3'>
        <div className='flex justify-between lg:p-4 items-center'>
          <h1 className='mt-3 mb-2 text-4xl font-bold text-slate-700 flex items-center gap-2'>
            Recipes
            <span><ImSpoonKnife size={22} className='text-[#FF6216]' /></span>
          </h1>
          <FaArrowRight
            className='text-black hover:text-secondary hover:cursor-pointer hover:scale-x-110 transition-transform duration-300 ease-in-out'
            size={30}
            title='recipes'
            onClick={() => navigate('/user/recipes')}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
          {
            isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => <RecipeCardSkeleton key={idx} />)
            )
              :
              allRecipes && allRecipes.length > 0 ? (
                allRecipes.slice(0, 6).map((item) => (
                  <RecipeReviewCard key={item._id} recipe={item} />
                ))
              ) : (
                <p>No recipes available.</p>
              )}
        </div>
      </section>

      <hr className='w-full py-2 mt-5 mb-2' />

      <section className='mb-[3%] px-8'>
        <h1 className='mt-3 mb-8 text-4xl font-bold text-slate-700 flex items-center gap-2 ml-[1%]'>
          Popular Recipes
          <span><ImSpoonKnife size={22} className='text-[#FF6216]' /></span>
        </h1>

        <div className="grid grid-cols-1 p-[1]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 p-4">
              {Array.from({ length: 3 }).map((_, idx) => <RecipeCardSkeleton key={idx} />)}
            </div>
          ) : (
            <Carousel
              value={popularRecipes}
              numScroll={1}
              numVisible={3}
              responsiveOptions={responsiveOptions}
              itemTemplate={trendingCardTemplate}
              prevIcon={<FaChevronLeft size={30} className="text-[#FF6216]" />} // Custom left arrow
              nextIcon={<FaChevronRight size={30} className="text-[#FF6216]" />} // Custom right arrow
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
