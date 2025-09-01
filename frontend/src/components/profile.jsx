/*import React, { useState, useEffect } from "react";

const Profile = () => {
  // Example user data (this should ideally come from your backend or auth context)
  const [user, setUser] = useState({
    name: "Shiva Jadiya",
    email: "shivajadiya@gmail.com",
    phone: "9876543210",
    college: "RGPV Bhopal",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle file upload (for profile picture)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: file });
      setPreview(URL.createObjectURL(file)); // preview image
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile saved! (Here you can connect with backend API)");
    // send `user` data to backend
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>

        <div className="flex items-center space-x-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
            {preview ? (
              <img
                src={preview}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://via.placeholder.com/150"
                alt="profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              readOnly
              className="w-full border rounded-lg p-2 mt-1 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">College</label>
            <input
              type="text"
              name="college"
              value={user.college}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;*/

import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData); // context update
    alert("Profile Updated!");
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-lg mx-auto">
      <div className="flex flex-col items-center">
        {/* Profile Picture Upload */}
        <label className="cursor-pointer">
          <img
            src={formData.profilePic || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <input
            type="file"
            className="hidden"
            onChange={(e) =>
              setFormData({
                ...formData,
                profilePic: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </label>

        <h2 className="text-xl font-bold mt-3">{formData.name}</h2>
        <p className="text-gray-500">{formData.email}</p>
      </div>

      {/* Other Fields */}
      <div className="mt-5 space-y-3">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="college"
          value={formData.college}
          onChange={handleChange}
          placeholder="College"
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSave}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;

