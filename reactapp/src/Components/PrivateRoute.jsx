import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (!token || !allowedRoles.includes(userRole)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
