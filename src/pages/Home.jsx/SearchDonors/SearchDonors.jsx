import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SearchDonors = () => {
  const axiosSecure = useAxiosSecure();
  const { LoadDistricts, LoadUpazilas } = useLoaderData();
  const districts = LoadDistricts[2].data;
  const upazilas = LoadUpazilas[2].data;

  const { register, handleSubmit, control, watch } = useForm();

  const district = useWatch({ control, name: "district" });

  const handleUpazila = (districtId) => {
    return upazilas.filter((c) => String(c.district_id) === String(districtId));
  };

  const [filters, setFilters] = useState({
    bloodType: "",
    district: "",
    upazila: ""
  });

  const { data: donors = [], isFetching, isError, error } = useQuery({
    queryKey: ["donors", filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        bloodType: filters.bloodType || "",
        district: filters.district || "",
        upazila: filters.upazila || ""
      });
      const res = await axiosSecure.get(`/users/search?${params.toString()}`);
      return Array.isArray(res.data) ? res.data : [];
    },
    enabled: true,
  });

  const handleSearch = (data) => {
    const districtObj = districts.find((d) => String(d.id) === String(data.district));
    setFilters({
      bloodType: data.bloodType,
      district: districtObj?.name || "",
      upazila: data.upazila,
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Donors</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit(handleSearch)} className="grid gap-4 md:grid-cols-3 mb-6">
        {/* Blood Type */}
        <select {...register("bloodType")} className="select select-bordered">
          <option value="">Blood Type</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        {/* District */}
        <select {...register("district")} className="select select-bordered" defaultValue="">
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        {/* Upazila */}
        <select 
          {...register("upazila")} 
          className="select select-bordered" 
          defaultValue=""
          disabled={!watch("district")}
        >
          <option value="">Select Upazila</option>
          {watch("district") && handleUpazila(watch("district")).map((up) => (
            <option key={up.id} value={up.name}>{up.name}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary col-span-3">Search</button>
      </form>

      {/* Error State */}
      {isError && (
        <div className="alert alert-error mb-4">
          <span>Error loading donors: {error?.message}</span>
        </div>
      )}

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Blood Type</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {isFetching && (
              <tr>
                <td colSpan="9" className="text-center py-8">
                  <span className="loading loading-spinner loading-lg"></span>
                </td>
              </tr>
            )}
            {!isFetching && donors.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-8">No donors found</td>
              </tr>
            )}
            {!isFetching && Array.isArray(donors) && donors.map((donor) => (
              <tr key={donor._id}>
                <td><input type="checkbox" className="checkbox" /></td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={donor.photoURL} alt={donor.displayName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{donor.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{donor.email}</td>
                <td>{donor.bloodType}</td>
                <td>{donor.district}</td>
                <td>{donor.upazila}</td>
                <td>{donor.role}</td>
                <td>
                  <span className={`badge ${donor.status === "active" ? "badge-success" : "badge-ghost"}`}>
                    {donor.status}
                  </span>
                </td>
                <td>{new Date(donor.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchDonors;