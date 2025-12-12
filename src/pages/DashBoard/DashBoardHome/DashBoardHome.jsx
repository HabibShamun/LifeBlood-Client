import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DashBoardHome = () => {
    // const {user}=useAuth()
    // const axiosSecure=useAxiosSecure()
    // const {}=useQuery({
    //     queryKey:['recentDonation'],
    //     queryFn:async()=>{
    //         const res= await axiosSecure.get(``)
    //     }
    // })
    return (
        <div>
            DashBoard Home <br />
            3 most recent donations <br />
            view my requests
        </div>
    );
};

export default DashBoardHome;