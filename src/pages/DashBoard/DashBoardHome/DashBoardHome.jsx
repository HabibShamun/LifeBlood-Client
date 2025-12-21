import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router'
import useRole from '../../../hooks/useRole';

const DashBoardHome = () => {
  const { role } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: recentDonation = [], isLoading, refetch } = useQuery({
    queryKey: ['recentDonation', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/email/${user.email}?limit=3`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: totalFunding = {} } = useQuery({
    queryKey: ['totalFunding'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation/total`);
      return res.data;
    },
  });

  const { data: totalDonors = [] } = useQuery({
    queryKey: ['totalDonor'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search`);
      return res.data;
    },
  });

  const { data: totalReq = [] } = useQuery({
    queryKey: ['totalReq'],
    queryFn: async () => {
      const res = await axiosSecure.get(`donationRequests`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    await axiosSecure.delete(`donationRequests/${id}`);
    refetch();
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Welcome <span className="text-red-600">{user?.displayName}</span> ({role})
      </h2>

      {role === 'donor' ? (
        <>
          {recentDonation.length > 0 ? (
            <>
              <h3 className="text-lg md:text-xl font-semibold mb-4">
                Your Most Recent Donation Requests
              </h3>

              <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="table w-full text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th>Recipient</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Blood Group</th>
                      <th>Status</th>
                      <th>Donor Info</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDonation.map((req) => (
                      <tr key={req._id} className="hover:bg-gray-50">
                        <td>{req.recipientName}</td>
                        <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                        <td>{req.donationDate}</td>
                        <td>{req.donationTime}</td>
                        <td>{req.bloodType}</td>
                        <td>
                          <span className={`badge ${
                            req.status === 'inprogress' ? 'badge-info' :
                            req.status === 'done' ? 'badge-success' : 'badge-warning'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td>
                          {req.status === 'inprogress' && (
                            <div className="text-xs">
                              <p>{user.displayName}</p>
                              <p>{user.email}</p>
                            </div>
                          )}
                        </td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            {req.status === 'inprogress' && (
                              <>
                                <button className="btn btn-success btn-xs">Done</button>
                                <button className="btn btn-error btn-xs">Cancel</button>
                              </>
                            )}
                            <Link to={`/dashboard/editDonation/${req._id}`} className="btn btn-warning btn-xs">
                              Edit
                            </Link>
                            <button onClick={() => handleDelete(req._id)} className="btn btn-error btn-xs">
                              Delete
                            </button>
                            <Link to={`/donateBlood/${req._id}`} className="btn btn-info btn-xs">
                              View
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-center md:justify-start">
                <Link to="/dashboard/allDonationRequests" className="btn btn-primary">
                  View All Requests
                </Link>
              </div>
            </>
          ) : (
            !isLoading && (
              <p className="text-gray-500 text-center md:text-left">
                You have not made any donation requests yet.
              </p>
            )
          )}
        </>
      ) : role === 'admin' || role === 'volunteer' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="card bg-white shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold">Total Donors</h3>
            <p className="text-2xl font-bold text-red-600">{totalDonors.length || 0}</p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold">Total Funding</h3>
            <p className="text-2xl font-bold text-green-600">${totalFunding.totalAmount || 0}</p>
          </div>

          <div className="card bg-white shadow-md p-6 text-center">
            <h3 className="text-lg font-semibold">Total Blood Requests</h3>
            <p className="text-2xl font-bold text-blue-600">{totalReq.length || 0}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No dashboard available for your role.</p>
      )}
    </div>
  );
};

export default DashBoardHome;
