import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Forms/Login';  // Assuming you have a Login component
import Register from '../pages/Forms/Register';
import NotFound from '../pages/NotFound';
const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
