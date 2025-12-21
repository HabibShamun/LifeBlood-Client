import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <span className="loading loading-infinity loading-xl"></span>
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;