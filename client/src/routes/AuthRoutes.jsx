import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';  // Assuming you have a Login component
import Register from '../pages/Register';

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default AuthRoutes;
