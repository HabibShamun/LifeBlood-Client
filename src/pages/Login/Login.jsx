import React, { useState } from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png';
import { Link, useLocation, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPass, setShowPass] = useState(false); // default hidden
  const { signInUser } = useAuth();
  const { handleSubmit, register, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // fallback to home if no state
  const from = location.state || '/';

  const handleLogIn = async (data) => {
    try {
      setLoading(true);
      setAuthError('');
      await signInUser(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      setAuthError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
      <div className="flex justify-center space-y-3 items-center flex-col">
        <img src={logo} className="w-15 h-15" alt="Logo" />
        <h2 className="text-2xl">Welcome Back</h2>
      </div>

      <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative w-full">
            <input
              {...register('password', { required: 'Password is required' })}
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
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Auth error message */}
          {authError && <p className="text-red-600 text-sm mt-2">{authError}</p>}

          {/* Submit */}
          <button className="btn btn-primary text-white my-4 w-full" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Login'
            )}
          </button>
        </fieldset>

        <p className="text-center text-gray-600 font-semibold">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
