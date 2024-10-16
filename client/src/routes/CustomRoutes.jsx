import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserProfile from '../pages/UserProfile';
import AddRecipeForm from '../pages/AddRecipeForm';
import RecipeDetailCard from '../components/Cards/RecipeDetailCard';
import RecipeMain from '../components/Recipe/RecipeMain';

const CustomRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="profile" element={<UserProfile />} />
                <Route path="add-Recipe" element={<AddRecipeForm />} />
                <Route path='/recipe/:recipeId' element={< RecipeDetailCard />}/> 
                <Route path='/recipes' element={< RecipeMain />}/> 
            </Routes>
        </div>
    );
};

export default CustomRoutes;
