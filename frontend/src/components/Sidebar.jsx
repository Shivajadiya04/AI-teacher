// Sidebar.jsx
/*import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Job Details', path: '/jobrole' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-[#0F172A] text-white shadow-md">
      <div className="text-2xl font-bold p-6">AI-teacher</div>
      <nav className="flex flex-col px-4">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 mb-2 rounded-md ${
                isActive ? 'bg-[#1E293B]' : 'hover:bg-[#1E293B]'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;*/

// Sidebar.jsx
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Job Details", path: "/jobrole" },
    { name: "Roadmap", path: "/roadmap" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
        setIsOpen(false); // hide sidebar on mobile
      } else {
        setIsMobile(false);
        setIsOpen(true); // show sidebar on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Top Navbar (mobile only) */}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md flex justify-between items-center px-4 py-3 z-50">
          <div className="text-xl font-bold text-indigo-600">AI-teacher</div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-700 text-2xl"
          >
            <FiMenu />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0F172A] text-white shadow-md transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${!isMobile ? "translate-x-0" : ""}`}
      >
        <div className="flex justify-between items-center p-6">
          <div className="text-2xl font-bold">AI-teacher</div>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl"
            >
              <FiX />
            </button>
          )}
        </div>
        <nav className="flex flex-col px-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-2 mb-2 rounded-md ${
                  isActive ? "bg-[#1E293B]" : "hover:bg-[#1E293B]"
                }`
              }
              onClick={() => isMobile && setIsOpen(false)} // close on mobile click
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;

