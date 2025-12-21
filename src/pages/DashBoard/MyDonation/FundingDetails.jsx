import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router'
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const FundingDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();

  const { isLoading, data: funding } = useQuery({
    queryKey: ['donationDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/${id}/details`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (!funding) {
    return <p className="text-center text-gray-500">Donation not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link
        to="/dashboard/myDonation"
        className="text-blue-600 hover:underline block mb-6 text-sm sm:text-base"
      >
        ← Go back
      </Link>

      <div className="bg-white shadow rounded-lg p-6 sm:p-8 space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">
          Donation Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <p><strong>ID:</strong> {funding._id}</p>
          <p><strong>Funder Name:</strong> {funding.funderName}</p>
          <p><strong>Funder Email:</strong> {funding.funderEmail}</p>
          <p><strong>Amount:</strong> ${funding.amount}</p>
          <p><strong>Status:</strong> {funding.status}</p>
          <p className="break-all"><strong>Stripe Session ID:</strong> {funding.stripeSessionId}</p>
          <p><strong>Created At:</strong> {new Date(funding.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default FundingDetails;
