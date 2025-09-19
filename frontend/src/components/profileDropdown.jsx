import React, { useContext, useState, useEffect, useRef } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import UserContext from "../context/UserContext";
import EditProfileModal from "./EditProfile";

const ProfileDropdown = () => {
  const { user, logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName =
    user.name ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.email ||
    "Unknown User";

  return (
    <div ref={dropdownRef} className="relative p-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full p-2 rounded hover:bg-[#1E293B] transition-colors"
      >
        <div>
          <p className="font-semibold text-white">{displayName}</p>
          <p className="text-sm text-gray-300">{user.email}</p>
        </div>
        <FaUser className="text-white" />
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 right-0 bg-[#334155] rounded-lg shadow-lg p-4 flex flex-col gap-3 w-56 transition transform duration-200 ease-in-out">
          <p className="font-semibold text-white">{displayName}</p>
          <p className="text-sm text-gray-300">{user.email}</p>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-blue-600 text-white py-1 rounded"
          >
            Edit Profile
          </button>

          <button
            onClick={logout}
            className="mt-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-2 rounded transition-colors"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </div>
  );
};

export default ProfileDropdown;
