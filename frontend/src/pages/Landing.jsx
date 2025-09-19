import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Logo from "/LOGO.svg";
import { Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0b1120] text-[#e5e7eb] min-h-screen font-sans">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#0b1120] shadow-md sticky top-0 z-50 border-b border-[#a855f7]">
        <div className="text-2xl font-bold text-[#a855f7]">AI Education</div>
        <ul className="flex space-x-6 font-semibold text-[#e5e7eb]">
          
          <li>
  <Link to="/home" className="hover:text-[#a855f7] cursor-pointer">Home</Link>
</li>

          
          <li className="hover:text-[#a855f7] cursor-pointer">Job Details</li>
          <li className="hover:text-[#a855f7] cursor-pointer">Roadmap</li>
          <li className="hover:text-[#a855f7] cursor-pointer"> <Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 px-6 bg-[#0b1120]">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Build Smarter with <span className="text-[#a855f7]">AI-Powered Education</span>
        </motion.h1>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Your personalized AI platform to create targeted roadmaps, evaluate subject strength, and take company-specific tests.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-10 px-6 py-3 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full font-semibold transition duration-300"
        >
          Get Started Now
        </button>
      </section>

      {/* Problems Section */}
      <section className="py-20 bg-[#0b1120] px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#a855f7] mb-6">
          Traditional Study = Wasted Effort
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-10">
          Without direction, you're studying everything — but mastering nothing. AI Education fixes that.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-[#1f2937] rounded-3xl p-8 shadow-lg flex items-center justify-center">
            <span className="text-3xl text-[#a855f7] font-bold">Core Challenges</span>
          </div>

          <div className="bg-[#1f2937] border border-[#a855f7]/30 rounded-2xl p-8 text-sm text-gray-300 space-y-2">
            <h3 className="text-lg font-semibold text-[#a855f7] mb-4">
              What Learners Face
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 list-disc pl-5">
              <li>Unclear Learning Path</li>
              <li>Weak Subject Focus</li>
              <li>No Test Feedback</li>
              <li>Misaligned Prep</li>
              <li>Time Wastage</li>
              <li>Low Confidence</li>
              <li>No Personalization</li>
              <li>Job Mismatch</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0b1120] text-center py-20 px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your AI Study Partner <span className="text-[#a855f7]">Delivers Results</span>
        </motion.h2>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          From roadmap generation to weak-topic tests, everything is aligned with your career goal.
        </p>

        <div className="flex flex-wrap justify-center mt-10 gap-4">
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            🧭 Auto-generated career roadmap
          </div>
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            📊 Subject-wise strength analysis
          </div>
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            🧠 AI-curated mock tests based on weak areas
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
