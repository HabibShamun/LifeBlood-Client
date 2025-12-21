import React, { useEffect, useState } from 'react';
import logo from '../../assets/Untitled-design-2-removebg-preview(1).png'
import { Link, useLoaderData } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import useAxios from '../../hooks/useAxios';


const Register = () => {
  
    const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const { LoadDistricts, LoadUpazilas } = useLoaderData();
    const districts=LoadDistricts[2].data
    const upazilas=LoadUpazilas[2].data
    const {registerUser,updateUserProfile}=useAuth()
    const Axios=useAxios()
  const handleRegister = (data) => {
    console.log(data)
    const district = districts.find(d=>d.id===data.district)
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
                     district:district.name,
                     upazila:data.upazila,
                     address:data.address,
                     phoneNumber:data.phoneNumber
                }

                Axios.post('/users',userInfo).then(res=>{
                    if(res.data.insertedId) {
                        console.log('user was created in the db')
                    }
                }).catch(e=>console.log(e))


                const userProfile={
                                        displayName:data.userName,
                     photoURL:photoURL
                }
                updateUserProfile(userProfile)
                .then(()=>{

                }).catch(e=>console.log(e))
         }).catch(e=>console.log(e))
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
          <input {...register('userName', {required:true})} type="text" className="input w-auto" placeholder="Name" />
  {
    errors.userName?.type==='userName' && <p className='text-red-500'>Name is Required</p>
  }



          {/* photo */}
          <label className="label">Photo</label>
        <input {...register('photo', {required:true})} type="file" className="file-input" />
  {
    errors.photo?.type==='photo' && <p className='text-red-500'>Name is Required</p>
  }  
   
   
          {/* email */}
          <label className="label">Email</label>
          <input {...register('email', {required:true})} type="email" className="input w-auto" placeholder="Email" />

 {
    errors.email?.type==='email' && <p className='text-red-500'>Name is Required</p>
  }  
  
  
{/* Password */}
      <div className="form-control">
        <label className="label">Password</label>
        <input
          {...register("password", {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
          })}
          type="password"
          className="input input-bordered w-full"
          placeholder="Password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500">Password is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-500">
            Password must be at least 6 characters
          </p>
        )}
        {errors.password?.type === "pattern" && (
          <p className="text-red-500">
            Password must contain uppercase, lowercase, and a number
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-control">
        <label className="label">Confirm Password</label>
        <input
          {...register("confirmPassword", {
            required: true,
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          type="password"
          className="input input-bordered w-full"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

    
    
    
          {/* phone number */}
          <label className="label">Phone Number</label>
          <input {...register('phoneNumber', {required:true})} type="tel" className="input w-auto" placeholder="Phone Number" />
 {
    errors.phoneNumber?.type==='phoneNumber' && <p className='text-red-500'>Name is Required</p>
  }
     
     
     
     
          {/* district */}
          <label className="label">District</label>
          <select {...register('district', {required:true})} className="select w-auto">
        {
            districts.map(district=>    <option key={district.id} value={district.id} >{district.name}</option>)
        }
          </select>
 {
    errors.district?.type==='district' && <p className='text-red-500'>Name is Required</p>
  }



          {/* upazila */}
          <label className="label">Upazila</label>
          <option disabled={true}>Pick a District</option>
          <select {...register('upazila', {required:true})} className="select w-auto">
           {
           
              handleUpazila(district).map((up,i)=> <option key={i}>{up.name}</option>)
           }
          </select>

 {
    errors.upazila?.type==='upazila' && <p className='text-red-500'>Name is Required</p>
  }



          {/* blood type */}
          <label className="label">Blood Type</label>
          <select {...register('bloodType', {required:true})} className="select w-auto">
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
 {
    errors.bloodType?.type==='bloodType' && <p className='text-red-500'>Name is Required</p>
  }




          {/* address */}
          <label className="label">Address</label>
          <input {...register('address', {required:true})} type="text" className="input w-auto" placeholder="Your current address" />
 {
    errors.address?.type==='address' && <p className='text-red-500'>Name is Required</p>
  }




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
