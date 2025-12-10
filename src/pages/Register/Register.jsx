import React, { useEffect, useState } from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png'
import { Link, useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';


const Register = () => {
  
  const { handleSubmit, register,control } = useForm();
  const { LoadDistricts, LoadUpazilas } = useLoaderData();
    const districts=LoadDistricts[2].data
    const upazilas=LoadUpazilas[2].data
    const {registerUser,updateUserProfile}=useAuth()
    const Axios=useAxios()
  const handleRegister = (data) => {
    console.log(data)
      const profileImg=data.photo[0]
      console.log(profileImg)
        registerUser(data.email,data.password).then((res)=>{
    
            const formData= new FormData()
            formData.append('image',profileImg)
            console.log(formData)
         
            const image_API_URL=`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

             axios.post(image_API_URL,formData)
             .then(res=>{
                console.log('after image uoload',res)
                const photoURL=res.data.data.url
                console.log(photoURL)
               const userInfo={
                    email:data.email,
                    displayName:data.userName,
                     photoURL:photoURL,
                     bloodType:data.bloodType,
                     district:data.district,
                     upazila:data.upazila
                }

                Axios.post('/users',userInfo).then(res=>{
                    if(res.data.insertedId) {
                        console.log('user was created in the db')
                    }
                })


                const userProfile={
                                        displayName:data.userName,
                     photoURL:photoURL
                }
                updateUserProfile(userProfile)
                .then(()=>{

                }).catch(e=>console.log(e))
         })
        })
  };

  


  const district=useWatch({control, name:'district'})

  const handleUpazila=(district)=>{
    const upazilaByDistrict=upazilas.filter(c=>c.district_id===district)
    return upazilaByDistrict
  }




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
        <input {...register('photo')} type="file" className="file-input" />
          {/* email */}
          <label className="label">Email</label>
          <input {...register('email')} type="email" className="input w-auto" placeholder="Email" />

          {/* password */}
          <label className="label">Password</label>
          <input {...register('password')} type="password" className="input w-auto" placeholder="Password" />
    {/* password */}
          {/* <label className="label">Confirm Password</label>
          <input  type="password" className="input w-auto" placeholder="Password" /> */}

          {/* phone number */}
          <label className="label">Phone Number</label>
          <input {...register('phoneNumber')} type="tel" className="input w-auto" placeholder="Phone Number" />

          {/* district */}
          <label className="label">District</label>
          <select {...register('district')} className="select w-auto">
        {
            districts.map(district=>    <option key={district.id} value={district.id} >{district.name}</option>)
        }
          </select>

          {/* upazila */}
          <label className="label">Upazila</label>
          <option disabled={true}>Pick a District</option>
          <select {...register('upazila')} className="select w-auto">
           {
           
              handleUpazila(district).map((up,i)=> <option key={i}>{up.name}</option>)
           }
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
