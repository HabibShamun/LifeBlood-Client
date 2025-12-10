import React from 'react';
import { CiClock1, CiHeart } from 'react-icons/ci';
import { IoRibbonOutline, IoShieldOutline } from 'react-icons/io5';
import { LuRibbon } from 'react-icons/lu';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <IoShieldOutline className="text-primary text-4xl" />,
      title: "Safe & Secure",
      desc: "All donations are screened and processed with the highest safety standards."
    },
    {
      icon: <CiHeart className="text-primary text-4xl" />,
      title: "Easy Matching",
      desc: "Quick donor-recipient matching based on blood type and location."
    },
    {
      icon: <CiClock1 className="text-primary text-4xl" />,
      title: "Urgent Requests",
      desc: "Fast response system for emergency blood requirements."
    },
    {
      icon: <IoRibbonOutline className="text-primary text-4xl" />,
      title: "Recognition",
      desc: "Track your donations and earn recognition for saving lives."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Choose Us
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="card-body items-center text-center">
                {feature.icon}
                <h3 className="card-title mt-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
