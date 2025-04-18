import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return false;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('Token payload:', payload);
        const isExpired = payload.exp < Date.now() / 1000;
        console.log('Token expired:', isExpired);
        return !isExpired;
    } catch (e) {
        console.error('Invalid token:', e);
        return false;
    }
};

const PrivateRoute = () => {
    const auth = isAuthenticated();
    console.log('Authenticated:', auth);
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
