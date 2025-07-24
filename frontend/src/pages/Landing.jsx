// src/pages/Landing.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#0F172A] text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#111827] shadow-md">
        <h1 className="text-2xl font-bold text-white">CompeteCampus</h1>
        <div className="space-x-6 text-sm">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#jobs" className="hover:text-blue-400 transition">Job Details</a>
          <a href="#roadmap" className="hover:text-blue-400 transition">Roadmap</a>
          <a href="#dashboard" className="hover:text-blue-400 transition">Dashboard</a>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Learn. Grow. Launch Your Career.
        </h2>
        <p className="mt-4 max-w-2xl text-gray-300 text-lg">
          Discover your personalized roadmap based on your skill level and goals. Master coding,
          aptitude, and web development—all in one place.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Get Started
        </button>
      </main>
    </div>
  );
}
