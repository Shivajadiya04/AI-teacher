// Sidebar.jsx
import React from 'react';
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

export default Sidebar;
