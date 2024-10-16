import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from '../src/components/Home/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import AuthRoutes from './routes/AuthRoutes';  // Assuming this will have Auth-related routes
import CustomRoutes from './routes/CustomRoutes';
function App() {
  const location = useLocation();  // Get the current route

  // Check if the current route is for login or register
  const showNavbarFooter = location.pathname !== '/auth/login' && location.pathname !== '/auth/register';

  return (
    <div className="h-[100vh]">
      {/* Render Navbar and Footer only if the current route is not /auth/login or /auth/register */}
      {showNavbarFooter && <Navbar />}

      <div className="">
      <Toaster />
        <Routes>
          {/* Define the public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/user/*" element={<CustomRoutes />} />
          
        </Routes>
      </div>

      {/* Render Footer only if Navbar is rendered (i.e., showNavbarFooter is true) */}
      {showNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
