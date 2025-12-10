import React from 'react';
import { Link } from 'react-router';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <section class="h-[400px] bg-red-600 bg-gradient-to-b from-red-600 to-red-700 text-white flex flex-col justify-center items-center text-center">
  <h1 class="text-4xl font-bold mb-6">Save Lives With Your Blood</h1>

  <div class="flex gap-4">
    <Link to={"/register"}
       class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
       Join as a Donor
    </Link>

    <Link to={"/search"}
       class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
       Search Donors
    </Link>
  </div>
</section>

<FeaturedSection></FeaturedSection>
<WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;