import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole !== requiredRole) {
            return <Navigate to="/" />;
        }

        return children;
    } catch (error) {
        console.error('Ошибка декодирования токена:', error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;