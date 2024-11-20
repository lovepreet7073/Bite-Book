import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import UserProfile from '../pages/UserProfile/UserProfile';
import AddRecipeForm from '../pages/Forms/AddRecipeForm';
import RecipeDetailCard from '../components/Cards/RecipeDetailCard';
import RecipeMain from '../components/Recipe/RecipeMain';
import ProtectedRoute from './ProtecetdRoute';
import EditRecipeForm from '../pages/Forms/EditRecipeModal';
import CollectionRecipes from '../components/Collection/CollectionRecipes';
const CustomRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/recipes" element={<RecipeMain />} />
                <Route path="/recipe/:recipeId" element={<ProtectedRoute> <RecipeDetailCard /> </ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/add-recipe" element={<ProtectedRoute><AddRecipeForm /></ProtectedRoute>} />
                <Route path="/edit-recipe/:id" element={<ProtectedRoute><EditRecipeForm /></ProtectedRoute>} />
                <Route path="/collection/:id" element={<ProtectedRoute><CollectionRecipes /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default CustomRoutes;
