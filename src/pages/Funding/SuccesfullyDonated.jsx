import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SuccesfullyDonated = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionId) {
        const res = await axiosSecure.get(`/checkout-session/${sessionId}`);
        setPaymentInfo(res.data);

        await axiosSecure.post('/donations', {
          funderEmail: res.data.metadata.funderEmail,
          funderName: res.data.metadata.funderName,
          amount: res.data.metadata.amount,
          stripeSessionId: res.data.id,
          status: 'completed',
          createdAt: new Date()
        });
      }
    };
    fetchSession();
  }, [sessionId, axiosSecure]);

  return (
    <div className="my-5 flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-8 text-center">
        
        {/* Success Badge */}
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-6">
          <span className="text-sm font-medium">Donation Successful</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
          Thank You for Saving Lives ❤️
        </h1>

        {/* Description */}
        {paymentInfo && (
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Your generous donation of{" "}
            <span className="font-semibold text-primary">
              ${paymentInfo.metadata.amount}
            </span>{" "}
            helps provide life-saving blood to those in need.
          </p>
        )}

        {/* Info Card */}
        {paymentInfo && (
          <div className="bg-gray-50  rounded-xl shadow-lg p-6 mb-10 text-left">
            <p className="font-semibold mb-2 text-gray-800">Donor Information</p>
            <p className="text-md"><span className='font-bold'>Name:</span> {paymentInfo.metadata.funderName}</p>
            <p className="text-md"><span className='font-bold'>Email:</span> {paymentInfo.metadata.funderEmail}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn bg-red-600 text-white hover:bg-red-700 rounded-xl px-8"
          >
            Go to Home
          </Link>
          <Link
            to="/dashboard"
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl px-8"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccesfullyDonated;
