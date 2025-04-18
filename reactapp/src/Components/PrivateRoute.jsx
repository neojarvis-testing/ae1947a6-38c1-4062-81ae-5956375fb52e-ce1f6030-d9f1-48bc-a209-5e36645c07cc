import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Decode the token to check its expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp < Date.now() / 1000;

    return !isExpired;
};

const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
