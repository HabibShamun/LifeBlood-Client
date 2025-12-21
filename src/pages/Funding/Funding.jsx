import React, { useState } from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Funding = () => {
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const { user } = useAuth();

  const handlePayment = async (balance) => {
    // Show confirmation alert
    Swal.fire({
      title: 'Confirm Donation',
      text: `Do you want to continue with a donation of $${balance}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, continue',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const fundingInfo = {
            funderName: user.displayName,
            funderEmail: user.email,
            donatedAmount: balance,
          };
          const res = await axiosSecure.post('/create-checkout-session', fundingInfo);
          window.location.assign(res.data.url);
        } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Something went wrong while processing your donation.', 'error');
        }
      }
    });
  };

  const userAmount = [25, 50, 100, 250, 500];
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  const finalAmount = Number(customAmount) || amount;

  return (
    <div>
      {/* Hero Section */}
      <section className="w-full bg-primary py-20 px-4">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl mb-4">Support Our Mission</h1>
          <p className="text-base md:text-lg opacity-90">
            Your financial contribution helps us save more lives through blood donation programs.
          </p>
        </div>
      </section>

      {/* Donation Card */}
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 m-5">
        <div className="flex flex-col items-center text-center space-y-4 mb-5">
          <img
            src={logo}
            alt="LifeBlood Foundation Logo"
            className="w-24 h-24 object-contain"
          />
          <h2 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Make a Donation
          </h2>
        </div>

        <p className="mb-2 text-gray-600 font-medium">Select Amount</p>

        {/* Preset Amounts */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {userAmount.map((amt) => (
            <button
              key={amt}
              onClick={() => {
                setAmount(amt);
                setCustomAmount('');
              }}
              className={`btn rounded-xl text-md transition ${
                amount === amt && !customAmount
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={`Donate ${amt} dollars`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom Amount */}
        <input
          type="number"
          placeholder="Custom Amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="input input-bordered w-full mb-6 rounded-xl"
        />

        {/* Donate Button */}
        <button
          onClick={() => handlePayment(finalAmount)}
          disabled={finalAmount <= 0}
          className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Donate ${finalAmount || 0}
        </button>

        <p className="text-center text-sm text-gray-500">
          Your donation is tax-deductible.
        </p>
      </div>
    </div>
  );
};

export default Funding;
