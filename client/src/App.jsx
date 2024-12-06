import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from '../src/components/Home/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Home/Footer';
import Navbar from './components/Navbar/Navbar';
import AuthRoutes from './routes/AuthRoutes';
import CustomRoutes from './routes/CustomRoutes';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();

  // Paths where Navbar and Footer should not be displayed
  const excludedPaths = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
  ];

  // Check if the current path matches the excluded paths or starts with `/auth/reset-password`
  const isExcludedPath =
    excludedPaths.includes(location.pathname) ||
    location.pathname.startsWith('/auth/reset-password');

  const showNavbarFooter = !isExcludedPath;

  return (
    <div>
      {showNavbarFooter && <Navbar />}

      <div>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/user/*" element={<CustomRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Render Footer only if Navbar is rendered */}
      {showNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
