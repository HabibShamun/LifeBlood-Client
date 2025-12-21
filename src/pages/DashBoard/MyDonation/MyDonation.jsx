import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const MyDonation = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();

  // Fetch donations depending on role
  const { isLoading, data: donations = [] } = useQuery({
    queryKey: ['donations', role, user?.email],
    queryFn: async () => {
      if (role === 'donor') {
        // Donor sees only their own donations
        const res = await axiosSecure.get(`/donations/email/${user.email}`);
        return res.data;
      } else {
        // Admin/volunteer sees all donations
        const res = await axiosSecure.get('/donations');
        return res.data;
      }
    },
    enabled: !!user?.email,
  });

  // Fetch total funding for admin/volunteer
  const { data: totalFunding = {} } = useQuery({
    queryKey: ['totalFunding'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donation/total');
      return res.data;
    },
    enabled: role === 'admin' || role === 'volunteer',
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        {role === 'donor' ? 'My Donations' : 'All Donations'}
      </h2>

      {/* Show total funding for admin/volunteer */}
      {(role === 'admin' || role === 'volunteer') && (
        <div className="mb-6 bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Total Funding</h3>
          <p className="text-2xl font-bold text-green-600">
            ${totalFunding.totalAmount || 0}
          </p>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="table w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th>Funder Name</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap">{donation.funderName}</td>
                <td className="whitespace-nowrap">{donation.funderEmail}</td>
                <td className="whitespace-nowrap">${donation.amount}</td>
                <td>
                  <span
                    className={`px-3 py-1 text-xs md:text-sm rounded-full font-medium ${
                      donation.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : donation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {donation.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/dashboard/fundingDetails/${donation._id}`}
                    className="btn btn-sm md:btn-md btn-error text-white"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {donations.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonation;
