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
import SuccesfullyDonated from '../pages/Funding/SuccesfullyDonated';
import Unsuccessful from '../pages/Funding/Unsuccessful';
import MyDonation from '../pages/DashBoard/MyDonation/MyDonation';
import EditDonation from '../pages/DashBoard/AllDonationRequests/EditDonation';
import DonateBlood from '../pages/DonateBlood/DonateBlood';
import FundingDetails from '../pages/DashBoard/MyDonation/FundingDetails';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import ActualRequests from '../pages/ActualRequests/ActualRequests';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[{
        index: true,
        Component: Home
    },{

      path: 'donateBlood/:id',
      element: <PrivateRoute>
        <DonateBlood></DonateBlood>
      </PrivateRoute>
    },{
      path:'requestDonation',
      element: <PrivateRoute>
        <RequestDonation></RequestDonation>
      </PrivateRoute>,
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
      path: 'allRequests',
      Component: ActualRequests
    },{
      path: 'funding',
      element: <Funding></Funding>
  
    },{
     path: 'successfulDonation',
     element:<SuccesfullyDonated></SuccesfullyDonated>
    },{
      path: 'unsuccessful',
      element: <Unsuccessful></Unsuccessful>
    },
      {
      path: 'searchDonors',
      element: 
        <SearchDonors></SearchDonors>
  ,
      loader: async () => {
    const districtsRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json'
    ).then(res => res.json());

    const upazilasRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json'
    ).then(res => res.json());

    return { LoadDistricts: districtsRes, LoadUpazilas: upazilasRes };
  }
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
       element:
       <PrivateRoute><DashBoardHome></DashBoardHome></PrivateRoute>
       
    },
    {
      path: 'dashboardCreateRequest',
      element: <PrivateRoute>
        <RequestDonation></RequestDonation>
      </PrivateRoute>,
      loader: async () => {
    const districtsRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/districts/districts.json'
    ).then(res => res.json());

    const upazilasRes = await fetch(
      'https://raw.githubusercontent.com/nuhil/bangladesh-geocode/refs/heads/master/upazilas/upazilas.json'
    ).then(res => res.json());

    return { LoadDistricts: districtsRes, LoadUpazilas: upazilasRes };
  }
    },
    {
      path:'dashboardFunding',
      element:<PrivateRoute>
        <Funding></Funding>
      </PrivateRoute>
    },
{
    path:'profile',
    element: <PrivateRoute>
      <Profile></Profile>
    </PrivateRoute>
},
{
  path: 'allDonationRequests',
  element: <PrivateRoute>
    <AllDonationRequests></AllDonationRequests>
  </PrivateRoute>
},{
  path:'editDonation/:id',
  element:<PrivateRoute><EditDonation></EditDonation></PrivateRoute>,
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
  path: 'userManagement',
  element: <AdminRoute>
    <UserManageMent></UserManageMent>
  </AdminRoute>
},{
  path: 'myDonation',
 element: <PrivateRoute>

  <MyDonation></MyDonation>
 </PrivateRoute>
},{
  path:'fundingDetails/:id',
  element:<PrivateRoute><FundingDetails></FundingDetails></PrivateRoute>
}
]
  }
]);

export default router;