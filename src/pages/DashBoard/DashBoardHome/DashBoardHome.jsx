import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DashBoardHome = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {data:recentDonation=[]}=useQuery({
        queryKey:['recentDonation'],
        queryFn:async()=>{
            const res= await axiosSecure.get(`/donationRequests/${user.email}`)
            return res.data
        }
    })
    return (
        <div className='p-5'>
            <h1 className="text-5xl text-primary">Welcome {user.displayName}</h1>
            3 most recent donations <br />
            view my requests: {recentDonation.length}
        </div>
    );
};

export default DashBoardHome;