import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 min-h-screen">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600">AI Education</div>
        <ul className="flex space-x-6 font-semibold text-gray-700">
          <li className="hover:text-indigo-600 cursor-pointer">Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">Job Details</li>
          <li className="hover:text-indigo-600 cursor-pointer">Roadmap</li>
          <li className="hover:text-indigo-600 cursor-pointer"> <Link to="/dashboard">Dashboard</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="px-10 py-20 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="text-5xl md:text-6xl font-bold text-indigo-700 mb-6"
        >
          Unlock Your Career Potential
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Get personalized roadmaps, subject strength analysis, and company-based test guidance to crack your dream job.
        </motion.p>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-10 py-10">
        {[
          {
            title: "Subject Strength Check",
            desc: "Analyze your strong and weak subjects based on test performance and past records.",
          },
          {
            title: "Company-Based Tests",
            desc: "Practice tests curated by patterns of top companies like Amazon, Google, and TCS.",
          },
          {
            title: "Personalized Roadmaps",
            desc: "Roadmaps tailored to your weaknesses and job role preferences (SDE, Analyst, etc.)",
          },
          {
            title: "Progress Tracker",
            desc: "Visualize how far you've come and where you need to focus more.",
          },
          {
            title: "Competitive Leaderboard",
            desc: "Compete with peers to stay motivated and track rankings based on test scores.",
          },
          {
            title: "Mock Interviews",
            desc: "Prepare with AI-driven mock interviews matching your career track.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-md border hover:border-indigo-500 transition-all duration-300"
          >
            <h3 className="text-xl font-bold text-indigo-600 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="text-center py-20 px-6 bg-indigo-600 text-white">
        <h2 className="text-3xl font-semibold mb-4">Start Your Personalized Career Journey Today</h2>
        <p className="mb-6">Let AI guide you towards your dream job with accurate feedback and smart preparation techniques.</p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold shadow-md hover:bg-gray-100 transition-all duration-300">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-10 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 AI Education Platform. All rights reserved.</p>
          <div className="flex space-x-6 text-gray-500 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
