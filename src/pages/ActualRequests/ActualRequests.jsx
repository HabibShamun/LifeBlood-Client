import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const ActualRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { isLoading, data: requests = [] } = useQuery({
    queryKey: ['pendingRequests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donationRequests'); 
      return res.data.filter((req) => req.status === 'pending'); 
    },
  });

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
        Pending Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table w-full text-sm md:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th>Recipient</th>
                <th>Hospital</th>
                <th>Blood Type</th>
                <th>Location</th>
                <th>Needed By</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50">
                  <td>{req.recipientName}</td>
                  <td>{req.hospitalName}</td>
                  <td>{req.bloodType}</td>
                  <td>{req.hospitalAddress}</td>
                  <td>{new Date(req.donationDate).toLocaleString()}</td>
                  <td>
                    <span className="badge badge-warning">{req.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        if (!user) {
                          navigate('/login');
                        } else {
                          navigate(`/donateBlood/${req._id}`);
                        }
                      }}
                      className="btn btn-error btn-xs md:btn-sm text-white"
                    >
                      Donate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActualRequests;
