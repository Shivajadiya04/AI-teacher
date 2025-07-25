// src/pages/Landing.jsx
/*import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1120] to-[#0F172A] text-white font-sans">
      {}
      <nav className="flex justify-between items-center px-6 py-4 bg-[#111827] shadow-md">
        <h1 className="text-2xl font-bold text-white">CompeteCampus</h1>
        <div className="space-x-6 text-sm">
          <a href="#home" className="hover:text-blue-400 transition">Home</a>
          <a href="#jobs" className="hover:text-blue-400 transition">Job Details</a>
          <a href="#roadmap" className="hover:text-blue-400 transition">Roadmap</a>
          <a href="#dashboard" className="hover:text-blue-400 transition">Dashboard</a>
        </div>
      </nav>

      {}
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
}*/

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "/LOGO.svg";

const features = [
  {
    title: "Smart Practice",
    desc: "AI-generated quizzes & feedback",
    icon: "🧠",
  },
  {
    title: "Voice Assistant",
    desc: "Talk with your learning buddy",
    icon: "🎙️",
  },
  {
    title: "Track Progress",
    desc: "Detailed analytics dashboard",
    icon: "📊",
  },
  {
    title: "Instant Help",
    desc: "24/7 AI learning support",
    icon: "⚡",
  },
];

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-white flex flex-col items-center justify-start px-4 py-10">
      {/* Main Card */}
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-16 grid md:grid-cols-2 gap-8 max-w-6xl w-full items-center mb-16">
        {/* Left Side Content */}
        <div className="space-y-6">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-800"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empower Learning with <br />{" "}
            <span className="text-indigo-600">AI Education</span>
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover smarter ways to study, practice and grow through our
            AI-based education tools.
          </motion.p>

          <motion.button
            className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </motion.button>
        </div>

        {/* Right Side Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img src={Logo} alt="Illustration" className="w-64 md:w-80" />
        </motion.div>
      </div>

      {/* Bottom Feature Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full px-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-full shadow-md p-6 flex flex-col items-center text-center border-2 border-indigo-200 hover:border-indigo-500 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Landing;

