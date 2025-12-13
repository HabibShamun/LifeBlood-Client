import React from 'react';
import { Link } from 'react-router';

const Unsuccessful = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center">
        
        {/* Cancel Badge */}
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full mb-6">
          <span className="text-lg">✖</span>
          <span className="text-sm font-medium">Payment Cancelled</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Donation Was Not Completed
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-600 mb-8">
          It looks like you cancelled the payment. No charges were made.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/funding"
            className="btn bg-red-600 text-white hover:bg-red-700 rounded-xl px-8"
          >
            Try Again
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

export default Unsuccessful;
