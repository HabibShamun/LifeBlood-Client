import React from 'react';
import { Link } from 'react-router'; // ✅ use react-router-dom
import useAuth from '../../hooks/useAuth';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';
import ContactUsSection from '../../components/ContactUsSection/ContactUsSection';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <section className="min-h-[300px] md:min-h-[400px] bg-red-600 bg-gradient-to-b from-red-600 to-red-700 text-white flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Save Lives With Your Blood
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          {!user ? (
            <Link
              to="/register"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 text-center"
            >
              Join as a Donor
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 text-center"
            >
              Go to Dashboard
            </Link>
          )}

          <Link
            to="/search"
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 text-center"
          >
            Search Donors
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 sm:px-6 lg:px-12">
        <FeaturedSection />
      </section>

      {/* Why Choose Us Section */}
      <section className="px-4 sm:px-6 lg:px-12">
        <WhyChooseUs />
      </section>

      {/* Contact Us Section */}
      <section className="px-4 sm:px-6 lg:px-12">
        <ContactUsSection />
      </section>
    </div>
  );
};

export default Home;
