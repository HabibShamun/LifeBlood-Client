import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user}=useAuth()
    const axiosSecure=useAxiosSecure()
    const {isLoading:roleLoading, data:role='donor'}=useQuery({
        queryKey:['user-role', user?.email],
        queryFn: async ()=>{
            const res= await axiosSecure.get(`/users/${user.email}/role`)

            return res.data?.role||'donor'
        }
    })
    return {roleLoading, role}
};

export default useRole;