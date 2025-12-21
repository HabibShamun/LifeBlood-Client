import React from 'react';

const FeaturedSection = () => {
  return (
    <section className="py-12 bg-gray-50 text-center">
      <h2 className="text-2xl font-bold mb-6">Featured Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Easy Registration</h3>
          <p className="text-gray-600">
            Sign up quickly and become part of our donor community.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Find Donors Fast</h3>
          <p className="text-gray-600">
            Search and connect with donors in your area instantly.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Save Lives</h3>
          <p className="text-gray-600">
            Your donation can make the difference between life and death.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
