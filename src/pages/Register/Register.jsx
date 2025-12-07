import React from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png'
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Register = () => {
    const {user}=useAuth()
  const { handleSubmit, register } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg mx-auto my-10 shrink-0 shadow">
      <div className="flex justify-center space-y-3 items-center flex-col">
        <img src={logo} className="w-15 h-15" alt="" />
        <h2 className="text-2xl">Register as Donor</h2>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input {...register('userName')} type="text" className="input w-auto" placeholder="Name" />

          {/* photo */}
          <label className="label">Photo</label>
          <input {...register('photo')} type="text" className="input w-auto" placeholder="Photo URL" />

          {/* email */}
          <label className="label">Email</label>
          <input {...register('email')} type="email" className="input w-auto" placeholder="Email" />

          {/* password */}
          <label className="label">Password</label>
          <input {...register('password')} type="password" className="input w-auto" placeholder="Password" />

          {/* phone number */}
          <label className="label">Phone Number</label>
          <input {...register('phoneNumber')} type="tel" className="input w-auto" placeholder="Phone Number" />

          {/* district */}
          <label className="label">District</label>
          <select {...register('district')} className="select w-auto">
            <option>VScode</option>
          </select>

          {/* upazila */}
          <label className="label">Upazila</label>
          <select {...register('upazila')} className="select w-auto">
            <option>VScode</option>
          </select>

          {/* blood type */}
          <label className="label">Blood Type</label>
          <select {...register('bloodType')} className="select w-auto">
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          {/* address */}
          <label className="label">Address</label>
          <input {...register('address')} type="text" className="input w-auto" placeholder="Your current address" />

          <button className="btn btn-primary text-white my-4">Register</button>
        </fieldset>
        <p className="text-center text-gray-600 font-semibold">
          Already have an Account? <Link to={'/login'} className="text-primary">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
