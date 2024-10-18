import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading state or check any async logic here (like fetching user data)
        setLoading(false); 
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display a loading message or skeleton screen while loading
    }

    if (!jwt) {
        // Redirect to the login page if the user is not authenticated
        return <Navigate to="/auth/login" />;
    }

    return children; // If authenticated, render the children (protected routes)
};

export default ProtectedRoute;
