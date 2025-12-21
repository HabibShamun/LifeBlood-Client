import React from 'react';
import logo from '../../../assets/Untitled-design-2-removebg-preview(1).png'
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
const RequestDonation = () => {
  const navigate=useNavigate()
    const axiosSecure=useAxiosSecure()
    const {user}=useAuth()
      const {
      register,
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm();
    const { LoadDistricts, LoadUpazilas } = useLoaderData();
    const districts=LoadDistricts[2].data
    const upazilas=LoadUpazilas[2].data

      const district=useWatch({control, name:'district'})
    
      const handleUpazila=(district)=>{
        const upazilaByDistrict=upazilas.filter(c=>c.district_id===district)
        return upazilaByDistrict
      }
    const handleRequest=(data)=>{
        const district = districts.find(d=>d.id===data.district)
  const donationInfo = {
    requesterName: data.requesterName,
    requesterEmail: data.email,
    recipientName: data.recipientName,
    recipientDistrict: district.name,
    recipientUpazila: data.upazila,
    hospitalName: data.hospitalName,
    hospitalAddress: data.hospitalAddress,
    bloodType: data.bloodType,
    donationDate: new Date(data.donationDate).toISOString(), // ISO format
    donationTime: new Date(`${data.donationDate}T${data.donationTime}`).toISOString(), // combine date+time
    donationMessage: data.message,
  };
  axiosSecure.post('/donationRequests' , donationInfo).then(res=>{
    console.log(res.data)
  })
    }

    return (
        <div className='flex justify-center items-center p-5'>

            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow">
      <div className="card-body">
             <div className="flex justify-center space-y-3 items-center flex-col">
                <img src={logo} className="w-15 h-15" alt="" />
                <h2 className="text-2xl">Make Request</h2>
              </div>
        <form onSubmit={handleSubmit(handleRequest)} className="fieldset">

            {/* requester name */}
          <label className="label">Requester Name</label>
          <input {...register('requesterName')} type="text" className="input w-full" value={user?.displayName} readOnly/>

            {/* requester email */}
          <label className="label">Email</label>
          <input {...register('email')} type="email" className="input w-full" value={user?.email} readOnly />


            {/* recipent name */}
          <label className="label">Recipient Name</label>
          <input  {...register('recipientName')} type="text" className="input w-full" placeholder="Name" />

{/* District */}
<label className="label">District</label>
<select
  {...register("district", { required: true })}
  className="select select-bordered w-full"
  defaultValue=""   // ensures no option is selected initially
>
  <option value="" disabled>
    Select District
  </option>
  {districts.map((district) => (
    <option key={district.id} value={district.id}>
      {district.name}
    </option>
  ))}
</select>
{errors.district && (
  <p className="text-red-500">District is required</p>
)}

{/* Upazila */}
<label className="label">Upazila</label>
<select
  {...register("upazila", { required: true })}
  className="select select-bordered w-full"
  defaultValue=""
>
  <option value="" disabled>
    Select Upazila
  </option>
  {watch("district") &&
    handleUpazila(watch("district")).map((up, i) => (
      <option key={i} value={up.name}>
        {up.name}
      </option>
    ))}
</select>
{errors.upazila && (
  <p className="text-red-500">Upazila is required</p>
)}



            {/* hospital name */}
          <label className="label">Hospital Name</label>
          <input {...register('hospitalName')} type="text" className="input w-full" placeholder="Name" />

            {/* hospital address */}
          <label className="label">Address</label>
          <input {...register('hospitalAddress')} type="text" className="input w-full" placeholder="Address" />


            {/* blood type */}
          {/* blood type */}
<label className="label">Blood Type</label>
<select
  {...register("bloodType", { required: true })}
  className="select select-bordered w-full"
  defaultValue=""   // ensures no option is selected initially
>
  <option value="" disabled>
    Select Blood Type
  </option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
</select>

{errors.bloodType && (
  <p className="text-red-500">Blood type is required</p>
)}


{/* Donation Date */}
            <label className="label">Donation Date</label>
            <input
              {...register('donationDate', { required: true })}
              type="date"
              className="input input-bordered w-full"
            />
            {errors.donationDate && (
              <p className="text-red-500">Donation date is required</p>
            )}

            {/* Donation Time */}
            <label className="label">Donation Time</label>
            <input
              {...register('donationTime', { required: true })}
              type="time"
              className="input input-bordered w-full"
              step="60"
            />
            {errors.donationTime && (
              <p className="text-red-500">Donation time is required</p>
            )}

            {/* recipient message */}
            <label className="label">Why you need blood</label>
            <textarea
              {...register('message', { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Write your message..."
              rows={4}
            />
            {errors.message && (
              <p className="text-red-500">Message is required</p>
            )}


<button className="btn btn-primary mt-4">Request</button>
        </form>
      </div>
    </div>
        </div>

    );
};

export default RequestDonation;