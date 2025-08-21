import React, { useState } from "react";
import { FaBars, FaTimes, FaChartPie, FaUser, FaSignOutAlt } from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-indigo-700 text-white transition-transform duration-300 ease-in-out md:translate-x-0 z-50`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-indigo-500">
          <h2 className="text-lg font-bold">AI Education</h2>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTimes size={20} />
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
            <FaChartPie className="mr-3" /> Dashboard
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
            <FaUser className="mr-3" /> Profile
          </li>
          <li className="flex items-center px-4 py-2 hover:bg-indigo-600 cursor-pointer">
            <FaSignOutAlt className="mr-3" /> Logout
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 lg:ml-64 mt-[60px] lg:mt-0">
        {/* Top navbar */}
        <header className="flex items-center justify-between bg-white px-4 py-3 shadow-md sticky top-0 z-40">
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-xl font-bold text-gray-700">Dashboard</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
