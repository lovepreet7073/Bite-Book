import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
    const jwt = localStorage.getItem("jwt");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!jwt) {
        return <Navigate to="/auth/login" />;
    }
    return children;
};

export default ProtectedRoute;
