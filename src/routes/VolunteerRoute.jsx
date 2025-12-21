import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from './Forbidden';


const RiderRoutes = ({children}) => {
    const {user,loading}=useAuth()
    const {role, roleLoading}=useRole()

    if(loading||roleLoading||!user) {
        return <span className="loading loading-infinity loading-xl"></span>
    }
      if(role!=='volunteer') {
        return <Forbidden></Forbidden>
    }
    return children
};

export default RiderRoutes;