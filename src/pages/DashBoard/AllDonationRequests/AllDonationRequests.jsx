import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {  useQuery } from '@tanstack/react-query';
import { MdOutlineDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

const AllDonationRequests = () => {
    const axiosSecure=useAxiosSecure()
  const {isLoading,data:requests=[]}=useQuery({
    queryKey:['requests'],
    queryFn: async()=>{
          const res=await axiosSecure.get('/donationRequests')
          return res.data
    }
  })
    return (
        <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
  {requests.map((request) => (
    <div
      key={request._id}
      className="w-full bg-white rounded-xl shadow-md p-6"
    >
      {/* Top section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
        <h2 className="text-lg md:text-xl font-bold">{request.hospitalName}</h2>
        <div className="flex items-center gap-2">
          <span className="text-primary text-xl md:text-2xl">🩸</span>
          <span className="text-primary font-semibold text-base md:text-lg">
            {request.bloodType}
          </span>
        </div>
      </div>

      {/* Status tags */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-3 py-1 text-xs md:text-sm bg-red-100 text-red-600 rounded-full">
          {request.status}
        </span>
        <span className="px-3 py-1 text-xs md:text-sm bg-orange-100 text-orange-600 rounded-full">
          Urgent
        </span>
      </div>

      {/* Message */}
      <p className="mt-3 text-gray-700 text-sm md:text-base">{request.donationMessage}</p>

      {/* Location row */}
      <div className="flex items-center gap-2 mt-4 text-gray-600 text-sm md:text-base">
        <span>📍</span>
        <span>{request.hospitalAddress}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mt-2 text-gray-600 text-sm md:text-base">
        <span>📅 Needed by:</span>
        <span className="font-medium">{request.donationDate}</span>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-3">
        <button className="w-full sm:w-auto flex-1 bg-red-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-red-700 transition">
          Respond to Request
        </button>

        <div className="flex items-center gap-3">
          <button className="px-3 md:px-4 flex justify-center items-center gap-1 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 text-sm md:text-base">
            <FaEdit /> Edit
          </button>
          <button className="px-3 md:px-4 flex justify-center items-center gap-1 py-2 border border-red-500 rounded-lg text-red-600 hover:bg-red-50 text-sm md:text-base">
            <MdOutlineDelete /> Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

    );
};

export default AllDonationRequests;