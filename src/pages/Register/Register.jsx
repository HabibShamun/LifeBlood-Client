import React, { useState } from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png';
import { Link, useLoaderData, useNavigate } from 'react-router'
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const { LoadDistricts, LoadUpazilas } = useLoaderData();
  const districts = LoadDistricts[2].data;
  const upazilas = LoadUpazilas[2].data;
  const { registerUser, updateUserProfile } = useAuth();
  const Axios = useAxios();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleRegister = async (data) => {
    try {
      const district = districts.find(d => d.id === data.district);
      const profileImg = data.photo[0];

      // Register user in Firebase/Auth
      await registerUser(data.email, data.password);

      // Upload image
      const formData = new FormData();
      formData.append('image', profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // Save user in DB
      const userInfo = {
        email: data.email,
        displayName: data.userName,
        photoURL,
        bloodType: data.bloodType,
        district: district.name,
        upazila: data.upazila,
        address: data.address,
        phoneNumber: data.phoneNumber,
      };
      await Axios.post('/users', userInfo);

      // Update profile
      await updateUserProfile({ displayName: data.userName, photoURL });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const district = useWatch({ control, name: 'district' });
  const handleUpazila = (districtId) => upazilas.filter(c => c.district_id === districtId);

  return (
    <div className="card bg-base-100 w-full max-w-lg mx-auto my-10 shrink-0 shadow">
      <div className="flex justify-center space-y-3 items-center flex-col">
        <img src={logo} className="w-15 h-15" alt="" />
        <h2 className="text-2xl">Register as Donor</h2>
      </div>

      <form onSubmit={handleSubmit(handleRegister)} className="card-body">
        <fieldset className="fieldset">
          {/* Name */}
          <label className="label">Name</label>
          <input {...register('userName', { required: 'Name is required' })} type="text" className="input input-bordered w-full" placeholder="Name" />
          {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}

          {/* Photo */}
          <label className="label">Photo</label>
          <input {...register('photo', { required: 'Photo is required' })} type="file" className="file-input w-full" />
          {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}

          {/* Email */}
          <label className="label">Email</label>
          <input {...register('email', { required: 'Email is required' })} type="email" className="input input-bordered w-full" placeholder="Email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative w-full">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
                pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, message: "Password must contain uppercase, lowercase, and a number" }
              })}
              type={showPass ? 'text' : 'password'}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Confirm Password */}
          <label className="label">Confirm Password</label>
          <div className="relative w-full">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
              type={showConfirmPass ? 'text' : 'password'}
              className="input input-bordered w-full pr-10"
              placeholder="Confirm Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

          {/* Phone Number */}
          <label className="label">Phone Number</label>
          <input {...register('phoneNumber', { required: 'Phone number is required' })} type="tel" className="input input-bordered w-full" placeholder="Phone Number" />
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

          {/* District */}
          <label className="label">District</label>
          <select {...register('district', { required: 'District is required' })} className="select select-bordered w-full">
            {districts.map(district => <option key={district.id} value={district.id}>{district.name}</option>)}
          </select>
          {errors.district && <p className="text-red-500">{errors.district.message}</p>}

          {/* Upazila */}
          <label className="label">Upazila</label>
          <select {...register('upazila', { required: 'Upazila is required' })} className="select select-bordered w-full">
            {handleUpazila(district).map((up, i) => <option key={i}>{up.name}</option>)}
          </select>
          {errors.upazila && <p className="text-red-500">{errors.upazila.message}</p>}

          {/* Blood Type */}
          <label className="label">Blood Type</label>
          <select {...register('bloodType', { required: 'Blood type is required' })} className="select select-bordered w-full">
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          {errors.bloodType && <p className="text-red-500">{errors.bloodType.message}</p>}

          {/* Address */}
          <label className="label">Address</label>
          <input {...register('address', { required: 'Address is required' })} type="text" className="input input-bordered w-full" placeholder="Your current address" />
          {errors.address && <p className="text-red-500">{errors.address.message}</p>}

          <button className="btn btn-primary text-white my-4 w-full">Register</button>
        </fieldset>
        <p className="text-center text-gray-600 font-semibold">
          Already have an Account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
