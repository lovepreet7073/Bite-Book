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
