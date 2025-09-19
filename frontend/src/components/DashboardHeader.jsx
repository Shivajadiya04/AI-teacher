import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import EditProfileModal from "./EditProfile";
import fallbackImage from "../assets/fallbackimage.png"; // ✅ Import your local fallback image

const DashboardHeader = ({ title }) => {
  const { user, logout, fetchUser } = useContext(UserContext);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(fallbackImage);

  const displayName =
    user?.name ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.email ||
    "Guest";

  // ✅ Update profile picture when user changes
  useEffect(() => {
    if (user?.profilePic) {
      setProfilePicUrl(`${user.profilePic}?t=${new Date().getTime()}`);
    } else {
      setProfilePicUrl(fallbackImage);
    }
  }, [user]);

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h1>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              {displayName}
            </p>
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>
          </div>

          <div className="relative">
            <img
              src={profilePicUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-400 cursor-pointer"
              onClick={() => setEditModalOpen(true)}
            />
            <button
              className="absolute -bottom-1 -right-1 bg-gray-700 text-white text-xs rounded-full px-1 hover:bg-gray-600"
              onClick={() => setEditModalOpen(true)}
            >
              ✎
            </button>
          </div>
        </div>
      </header>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          fetchUser(); // ✅ Refresh user data after modal closes
        }}
      />
    </>
  );
};

export default DashboardHeader;
