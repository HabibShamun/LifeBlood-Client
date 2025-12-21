import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router'
import useRole from '../../../hooks/useRole';
import useAuth from '../../../hooks/useAuth';

const AllDonationRequests = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: requests = [], refetch } = useQuery({
    queryKey: ['requests', role, user?.email],
    queryFn: async () => {
      if (role === 'admin' || role === 'volunteer') {
        const res = await axiosSecure.get('/donationRequests');
        return res.data;
      }
      const res = await axiosSecure.get(`/donationRequests/email/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatus = async (id, status) => {
    const statusInfo = { status };
    await axiosSecure.patch(`donationRequests/${id}/status`, statusInfo);
    refetch();
  };

  const handleDelete = async (id) => {
    await axiosSecure.delete(`donationRequests/${id}`);
    refetch();
  };

  const [statusFilter, setStatusFilter] = useState("all");

  const filteredRequests =
    statusFilter === "all"
      ? requests
      : requests.filter((req) => req.status === statusFilter);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Dropdown filter */}
      <div className="flex justify-end mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          No donation requests found for <span className="font-semibold">{statusFilter}</span>.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm md:text-base">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Blood Type</th>
                <th>Status</th>
                <th>Message</th>
                <th>Address</th>
                <th>Needed By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td>{request.hospitalName}</td>
                  <td>{request.bloodType}</td>
                  <td>
                    <span
                      className={`px-3 py-1 text-xs md:text-sm rounded-full font-medium ${
                        request.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : request.status === 'inprogress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="max-w-xs truncate">{request.donationMessage}</td>
                  <td className="max-w-xs truncate">{request.hospitalAddress}</td>
                  <td>{new Date(request.donationDate).toLocaleString()}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {/* Respond: only if pending and not the requester */}
                      {request.status === "pending" && request.requesterEmail !== user.email && (
                        <Link
                          to={`/donateBlood/${request._id}`}
                          className="btn btn-xs md:btn-sm btn-error text-white"
                        >
                          Respond
                        </Link>
                      )}

                      {/* Mark Done for inprogress */}
                      {request.status === "inprogress" && (
                        <button
                          onClick={() => updateStatus(request._id, "done")}
                          className="btn btn-xs md:btn-sm btn-success text-white"
                        >
                          Mark Done
                        </button>
                      )}

                      {/* Done badge */}
                      {request.status === "done" && (
                        <span className="btn btn-xs md:btn-sm btn-success text-white">
                          Done
                        </span>
                      )}

                      {/* Donor: edit/delete only own pending requests */}
                      {role === 'donor' &&
                        request.requesterEmail === user.email &&
                        request.status === 'pending' && (
                          <>
                            <Link
                              to={`/dashboard/editDonation/${request._id}`}
                              className="btn btn-xs md:btn-sm btn-warning"
                            >
                              <FaEdit /> Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(request._id)}
                              className="btn btn-xs md:btn-sm btn-outline btn-error"
                            >
                              <MdOutlineDelete /> Delete
                            </button>
                          </>
                        )}

                      {/* Admin: delete only */}
                      {role === 'admin' && (
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="btn btn-xs md:btn-sm btn-outline btn-error"
                        >
                          <MdOutlineDelete /> Delete
                        </button>
                      )}
                    </div>
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

export default AllDonationRequests;
