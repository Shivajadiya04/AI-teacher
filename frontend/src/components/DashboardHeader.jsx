import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const DashboardHeader = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="flex items-center space-x-2 cursor-pointer">
        <img
          src={user.profilePic || "https://via.placeholder.com/40"}
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />
        <span className="font-medium">{user.name}</span>
      </div>
    </div>
  );
};

export default DashboardHeader;
