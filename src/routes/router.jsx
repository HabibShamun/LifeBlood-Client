import React from 'react';
import { createBrowserRouter } from "react-router";
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home.jsx/Home';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import DashboardLayout from '../layouts/DashboardLayout';
import DashBoardHome from '../pages/DashBoard/DashBoardHome/DashBoardHome';
import Profile from '../pages/DashBoard/Profile/Profile';
import RequestDonation from '../pages/Home.jsx/RequestDonation/RequestDonation';
import Funding from '../pages/Funding/Funding';
import SearchDonors from '../pages/Home.jsx/SearchDonors/SearchDonors';
import AllDonationRequests from '../pages/DashBoard/AllDonationRequests/AllDonationRequests';
import UserManageMent from '../pages/DashBoard/UserManageMent/UserManageMent';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[{
        index: true,
        Component: Home
    },{
      path:'requestDonation',
      Component: RequestDonation,
        loader: async () => {
    const districtsRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json'
    ).then(res => res.json());

    const upazilasRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json'
    ).then(res => res.json());

    return { LoadDistricts: districtsRes, LoadUpazilas: upazilasRes };
  }
    },{
      path: 'funding',
      Component: Funding
    },{
      path: 'searchDonors',
      Component: SearchDonors
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
       index: true,
        Component: DashBoardHome
    },
{
    path:'profile',
    Component: Profile
},
{
  path: 'allDonationRequests',
  Component: AllDonationRequests
},{
  path: 'userManagement',
  Component: UserManageMent
}
]
  }
]);

export default router;