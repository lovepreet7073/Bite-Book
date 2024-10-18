import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserProfile from '../pages/UserProfile';
import AddRecipeForm from '../pages/AddRecipeForm';
import RecipeDetailCard from '../components/Cards/RecipeDetailCard';
import RecipeMain from '../components/Recipe/RecipeMain';
import ProtectedRoute from './ProtecetdRoute';
const CustomRoutes = () => {
    return (
        <div>
            <Routes>
                {/* Public routes */}
                <Route path="/recipes"
                    element={
                        <ProtectedRoute>
                            <RecipeMain />
                        </ProtectedRoute>
                    } />
         
        
            <Route
                    path="/recipe/:recipeId"
                    element={
                        <ProtectedRoute>
                            <RecipeDetailCard />
                        </ProtectedRoute>
                    }
                />
                {/* Protected routes */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <UserProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-recipe"
                    element={
                        <ProtectedRoute>
                            <AddRecipeForm />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default CustomRoutes;
