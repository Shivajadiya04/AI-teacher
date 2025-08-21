// components/MenuDropdown.jsx
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const MenuDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 rounded-md hover:bg-[#1E293B] focus:outline-none"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="mt-2 w-48 bg-[#1E293B] text-white rounded-md shadow-lg py-2">
          <a href="/profile" className="block px-4 py-2 hover:bg-[#334155]">👤 Profile</a>
          <a href="/contact" className="block px-4 py-2 hover:bg-[#334155]">📞 Contact</a>
          <a href="/help" className="block px-4 py-2 hover:bg-[#334155]">❓ Help</a>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
