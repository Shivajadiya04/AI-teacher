// frontend/src/components/EditProfileModal.jsx
import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { apiPost } from "../../utils/api"; // Make sure apiPost points to backend

const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, fetchUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfilePicPreview(user.profilePic || "");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePicPreview(URL.createObjectURL(file)); // Immediate preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      if (profilePicFile) formData.append("profilePic", profilePicFile);

      // Use apiPost helper with full backend URL
      await apiPost("/api/auth/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          // Do NOT set 'Content-Type', fetch handles FormData automatically
        },
      });

      await fetchUser(); // Reload user data
      onClose();
    } catch (err) {
      console.error("❌ Failed to update profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg space-y-4 w-80"
      >
        <h2 className="text-xl font-semibold">Edit Profile</h2>

        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="border p-2 rounded w-full"
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {profilePicPreview && (
          <img
            src={profilePicPreview}
            alt="Preview"
            className="w-20 h-20 rounded-full border mt-2"
          />
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
