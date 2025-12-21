import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router'

const Footer = () => {
  const { user } = useAuth();

  return (
    <footer className="bg-red-600 bg-gradient-to-b from-red-600 to-red-700 text-white py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">
        Ready to Save Lives?
      </h2>

      <p className="text-lg md:text-xl mb-8">
        Join thousands of donors making a difference every day.
      </p>

      {!user ? (
        <Link
          to="/register"
          className="bg-white text-red-600 font-medium px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Register Now
        </Link>
      ) : (
        <Link
          to="/dashboard"
          className="bg-white text-red-600 font-medium px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Go to Dashboard
        </Link>
      )}
    </footer>
  );
};

export default Footer;
