import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const DonateBlood = () => {
  const { id } = useParams(); // donation request ID from route
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);

  // Fetch donation request details
  const { data: request, isLoading,refetch } = useQuery({
    queryKey: ['donationRequest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/id/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const handleConfirmDonation = async () => {
    const donationInfo={
        donorName:user.displayName,
        donorEmail:user.email,
        donationReqId:id
    }
    await axiosSecure.patch(`/donationRequests/${id}/status`, { status: 'inprogress' });
    refetch()
    await axiosSecure.post(`/bloodDonation`,donationInfo).then(res=>console.log(res.data))
    setOpenModal(false);
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>

      {/* Request info */}
      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Recipient Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Hospital Address:</strong> {request.hospitalAddress}</p>
        <p><strong>Blood Type:</strong> {request.bloodType}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Message:</strong> {request.donationMessage}</p>
      </div>

      {/* Donate button */}
      {request.status === 'pending' && (
        <div className="mt-6">
          <button
            onClick={() => setOpenModal(true)}

            className="btn btn-primary"
          >
            Donate
          </button>
        </div>
      )}

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Donation</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Donor Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDonation}
                  className="btn btn-primary"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonateBlood;
