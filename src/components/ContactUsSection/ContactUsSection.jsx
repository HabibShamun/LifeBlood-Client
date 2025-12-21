import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../hooks/useAxios';

const ContactUsSection = () => {
  const axiosSecure = useAxios();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleForm = async (data) => {
    try {
      setLoading(true);
      const info = {
        name: data.name,
        email: data.email,
        message: data.msg,
      };
      await axiosSecure.post('/messages', info);
      setSubmitted(true);
      reset(); // clear form fields
    } catch (error) {
      console.error("Message submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-red-50 text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        Have questions or want to get involved? Reach out to us!
      </p>

      {!submitted ? (
        <form
          onSubmit={handleSubmit(handleForm)}
          className="max-w-md mx-auto space-y-4"
        >
          <input
            {...register('name')}
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <input
            {...register('email')}
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />
          <textarea
            {...register('msg')}
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            rows="4"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      ) : (
        <p className="text-green-600 font-semibold mt-6">
          ✅ Thank you! Your message has been sent.
        </p>
      )}
    </section>
  );
};

export default ContactUsSection;
