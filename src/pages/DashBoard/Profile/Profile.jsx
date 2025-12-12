import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';

const Profile = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: userinfo = {}, refetch } = useQuery({
    queryKey: ['user-info', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Track edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Reset form values when userinfo loads or when cancel is pressed
  useEffect(() => {
    reset({
      name: userinfo.displayName || user?.displayName || '',
      email: userinfo.email || user?.email || '',
      phoneNumber: userinfo.phoneNumber || '',
      address: userinfo.address || '',
    });
  }, [userinfo, user, reset]);

  const handleUpdate = (data) => {
    // 👉 You’ll implement this later
    console.log("Update called with:", data);
    setIsEditing(false);
    refetch();
  };

  const handleCancel = () => {
    reset(); // reset back to original values
    setIsEditing(false);
  };

  return (
    <div className="pl-2 sm:pl-5 md:pl-20 lg:pl-30 pt-5">
      <h1 className="text-4xl">Profile</h1>
      <p className="text-gray-600">Manage your account information</p>
      <div className="pt-5 flex flex-col sm:flex-row gap-5">
        
        {/* Profile card */}
        <div className="card bg-base-100 w-70 shadow">
          <figure className="px-10 pt-10">
            <img
              src={userinfo.photoURL || user?.photoURL}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold">{userinfo.displayName || user?.displayName}</h2>
            <p className="mb-2 border-b border-gray-300 w-full text-center">{role}</p>
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Blood Type</span>
                <span className="text-primary">{userinfo.bloodType || "NA"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Total Donation</span>
                <span className="text-gray-800">{userinfo.totalDonation || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Last Donation</span>
                <span className="text-gray-800">{userinfo.lastDonation || "NA"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editable form */}
        <div className="card-body max-w-120 shadow">
          <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {isEditing ? (
                <div className="flex gap-2 justify-center items-center">
                  <p
                    className="text-primary cursor-pointer"
                    onClick={handleCancel}
                  >
                    Cancel
                  </p>
                  <button type="submit" className="btn btn-primary text-white btn-sm">
                    Save
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="text-primary flex justify-center items-center gap-1 "
                  onClick={() => setIsEditing(true)}
                >
                  <FaRegEdit></FaRegEdit>
                  Edit
                </button>
              )}
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Name</span></label>
              <input
                type="text"
                {...register("name")}
                className="input input-bordered w-full"
                disabled={!isEditing}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Email</span></label>
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full"
                disabled={!isEditing}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Phone Number</span></label>
              <input
                type="text"
                {...register("phoneNumber")}
                className="input input-bordered w-full"
                disabled={!isEditing}
              />
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-medium">Address</span></label>
              <input
                type="text"
                {...register("address")}
                className="input input-bordered w-full"
                disabled={!isEditing}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
