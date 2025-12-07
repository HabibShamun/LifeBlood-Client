import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home.jsx/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[{
        index: true,
        Component: Home
    }]
  },{
    path: '/',
    Component: AuthLayout,
    children: [{
        path: 'login',
        Component: Login
    },{
        path: 'register',
        Component: Register
    }]
  }
]);

export default router;