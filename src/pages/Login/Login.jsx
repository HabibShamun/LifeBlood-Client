import React from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png'
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const Login = () => {
    const {signInUser}=useAuth()
    const   { handleSubmit, register } = useForm();

    const handleLogIn=(data)=>{
        console.log(data)
        signInUser(data.email,data.password).then().catch(e=>console.log(e))
    }
    return (
    <div className="card bg-base-100 w-full max-w-sm mx-auto my-10 shrink-0 shadow-2xl">
        <div className='flex justify-center space-y-3 items-center flex-col'>
        <img src={logo} className='w-15 h-15 ' alt="" />
        <h2 className='text-2xl '>Welcome Back</h2>
        </div>

      <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input {...register('email')} type="email" className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input {...register('passsword')} type="password" className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary text-white my-4">Login</button>
        </fieldset>
        <p className='text-center text-gray-600 font-semibold'>Don't have an account? <Link to={'/register'} className='text-primary'>Register</Link></p>
      </form>
    </div>

    );
};

export default Login;