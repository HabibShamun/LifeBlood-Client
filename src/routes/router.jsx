import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home.jsx/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashBoardHome from '../pages/DashBoard/DashBoardHome/DashBoardHome';
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
  Component: Register,
  loader: async () => {
    const districtsRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json'
    ).then(res => res.json());

    const upazilasRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json'
    ).then(res => res.json());

    return { LoadDistricts: districtsRes, LoadUpazilas: upazilasRes };
  }
}
]
  },{
    path:'dashboard',
    Component: DashboardLayout,
    children:[{
        path:'/dashboard',
        Component: DashBoardHome
    }]
  }
]);

export default router;