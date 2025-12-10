import React from 'react';

const Footer = () => {
    return (
     <footer className="bg-red-600 bg-gradient-to-b from-red-600 to-red-700 text-white py-20 text-center">

  <h2 class="text-3xl md:text-4xl font-semibold mb-4">
    Ready to Save Lives?
  </h2>

  <p class="text-lg md:text-xl mb-8">
    Join thousands of donors making a difference every day.
  </p>

  <a href="/register"
     class="bg-white text-red-600 font-medium px-8 py-3 rounded-lg shadow hover:bg-gray-100 transition">
     Register Now
  </a>
</footer>
    );
};

export default Footer;