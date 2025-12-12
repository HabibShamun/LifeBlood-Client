import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaHandHoldingHeart, FaHandsHelping, FaUserShield } from 'react-icons/fa';

const UserManageMent = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: users = [] ,refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const updateRole=(user,role)=>{
    const roleInfo={role:role}

    axiosSecure.patch(`/users/${user._id}/role`,roleInfo)
    .then(res=>{
        console.log(res.data)
        refetch()
    })

  }

    const updateStatus=(user,status)=>{
    const statusInfo={status:status}
console.log(statusInfo)
    axiosSecure.patch(`/users/${user._id}/status`,statusInfo)
    .then(res=>{
        console.log(res.data)
        refetch()
    })

  }

  return (
    <div className="p-4">
      {/* Table for md+ screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th className="hidden sm:table-cell">Email</th>
              <th className="hidden lg:table-cell">Role</th>
              <th className="hidden lg:table-cell">Edit Role</th>
              <th className="hidden md:table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={u._id || index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                        <img
                          src={u.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                          alt={u.displayName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm sm:text-base">{u.displayName}</div>
                      <div className="text-xs sm:text-sm opacity-50">
                        {u.district}, {u.upazila}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell">{u.email}</td>
                <td className="hidden lg:table-cell">{u.role}</td>
                <td className="hidden lg:table-cell text-primary flex justify-center gap-1">
                  {u.role === 'donor' && (
                    <button onClick={()=>updateRole(u,'volunteer')} className="btn btn-sm">Make Volunteer</button>
                  )}
                  {u.role === 'volunteer' && (
                    <button onClick={()=>updateRole(u,'donor')} className="btn btn-sm">Make Donor</button>
                  )}
                  {u.role === 'admin' && (
                    <button className="btn btn-primary btn-sm">Admin</button>
                  )}
                </td>
                <td className="hidden md:table-cell">
                  {u.status === 'active' ? (
                    <button onClick={()=>updateStatus(u,'disabled')} className="btn btn-sm">Disable</button>
                  ) : (
                    <button onClick={()=>updateStatus(u,'active')} className="btn btn-sm">Make Active</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="md:hidden space-y-4">
        {users.map((u, index) => (
          <div
            key={u._id || index}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img
                    src={u.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                    alt={u.displayName}
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{u.displayName}</div>
                <div className="text-sm opacity-50">
                  {u.district}, {u.upazila}
                </div>
              </div>
            </div>
            <p className="text-sm"><strong>Email:</strong> {u.email}</p>
            <p className="text-sm"><strong>Role:</strong> {u.role}</p>
            <p className="text-sm"><strong>Status:</strong> {u.status}</p>
            <div className="flex gap-2 mt-2">
              {u.role === 'donor' && (
                <button className="btn btn-sm">Make Volunteer</button>
              )}
              {u.role === 'volunteer' && (
                <button className="btn btn-sm">Make Donor</button>
              )}
              {u.role === 'admin' && (
                <button className="btn btn-primary btn-sm">Admin</button>
              )}
              {u.status === 'active' ? (
                <button onClick={()=>updateStatus(u,'disabled')} className="btn btn-sm">Disable</button>
              ) : (
                <button onClick={()=>updateStatus(u,'active')} className="btn btn-sm">Make Active</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManageMent;
