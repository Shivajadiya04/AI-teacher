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

/*import React from "react";
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
      
      <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-16 grid md:grid-cols-2 gap-8 max-w-6xl w-full items-center mb-16">
        
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

        
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img src={Logo} alt="Illustration" className="w-64 md:w-80" />
        </motion.div>
      </div>

      
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

export default Landing;  final 1 

import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this at top
// import { motion } from "framer-motion";
import Logo from "/LOGO.svg";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // ✅ Step 1: Import Link

const Landing = () => {
   const navigate = useNavigate(); // ✅ initialize
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-white flex flex-col">
      
      
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-indigo-600">AI Education</div>
        <ul className="flex space-x-6 font-semibold text-gray-700">
          <li className="hover:text-indigo-600 cursor-pointer"> <Link to="/home">Home</Link></li>
          <li className="hover:text-indigo-600 cursor-pointer">Job Details</li>
          <li className="hover:text-indigo-600 cursor-pointer">Roadmap</li>
          <li className="hover:text-indigo-600 cursor-pointer"><Link to="/dashboard">Dashboard</Link> </li>
        </ul>
      </nav>

      
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-16 grid md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
           
          <div className="space-y-6">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Empower Learning with <br />
              <span className="text-indigo-600">AI Education</span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Discover smarter ways to study, practice and grow through our AI-based education tools.
            </motion.p>

            <motion.button
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               onClick={() => navigate("/login")}  // ✅ navigation on click
            >
              Get Started
            </motion.button>
          </div>

          
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img src={Logo} alt="Illustration" className="w-64 md:w-80" />
          </motion.div>
        </div>
      </div>

  
      <main className="flex flex-col items-center justify-center py-20 px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Choose your career direction</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { title: 'Web Developer', delay: 0.1 },
            { title: 'Data Scientist', delay: 0.2 },
            { title: 'UI/UX Designer', delay: 0.3 },
            { title: 'AI/ML Engineer', delay: 0.4 },
            { title: 'DevOps Engineer', delay: 0.5 },
            { title: 'Software Engineer', delay: 0.6 },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: item.delay }}
              className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-400/20 transition duration-300"
            >
              <h3 className="text-xl font-semibold text-center">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </main>


      
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold mb-4 md:mb-0">© 2025 AI Education</div>
          <div className="flex space-x-6 text-2xl">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-gray-300 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-300 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-300 transition" />
            </a>
          </div>
        </div>
        <p className="text-center mt-4 text-sm opacity-80">
          Designed with ❤️ to boost your learning experience
        </p>
      </footer>
    </div>
  );
};

export default Landing; 

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "/LOGO.svg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-black shadow-md sticky top-0 z-50 border-b border-green-500">
        <div className="text-2xl font-bold text-green-400">AI Education</div>
        <ul className="flex space-x-6 font-semibold text-white">
          <li
            className="hover:text-green-400 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li className="hover:text-green-400 cursor-pointer">Job Details</li>
          <li className="hover:text-green-400 cursor-pointer">Roadmap</li>
          <li className="hover:text-green-400 cursor-pointer">Dashboard</li>
        </ul>
      </nav>

      
      <section className="text-center py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Verify to <span className="text-green-400">Trust AI</span>
        </motion.h1>
        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
          Introducing Verifiable Compute. Ready for the Agentic AI Era. Ensure integrity and transparency in every AI workflow.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-10 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-full text-black font-semibold transition duration-300"
        >
          Schedule Demo
        </button>
      </section>

    
      <section className="py-20 bg-black px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-green-400 mb-6">
          New AI Workflows Equal New Threats
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-10">
          Compromising AI supply chains introduces critical risks. Stay aware of the growing threats and protect your systems effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          <div className="bg-gradient-to-br from-green-800/40 to-black rounded-3xl p-8 shadow-lg flex items-center justify-center">
            <span className="text-3xl text-green-400 font-bold">New Threats</span>
          </div>

          
          <div className="bg-green-100/10 backdrop-blur-md rounded-2xl p-8 border border-green-500 text-sm text-gray-300 space-y-2">
            <h3 className="text-lg font-semibold text-green-400 mb-4">
              The Problem
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 list-disc pl-5">
              <li>Inserting Backdoors in AI Models</li>
              <li>Hallucination</li>
              <li>Model DoS Attacks</li>
              <li>Bias and Discrimination</li>
              <li>Jailbreaks</li>
              <li>Social Engineering</li>
              <li>Extraction of AI Data</li>
              <li>Toxicity and Misalignment</li>
            </ul>
          </div>
        </div>
      </section>

      
      <section className="bg-black text-center py-20 px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Verifiable Compute <span className="text-green-400">Verifies</span>
        </motion.h2>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          What data goes in, where it runs, and what comes out — all verifiable. Secure your AI with complete visibility.
        </p>
        <div className="flex flex-wrap justify-center mt-10 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-green-500 text-white w-60 text-sm">
            <strong>✅</strong> What data goes into the AI workflow
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-green-500 text-white w-60 text-sm">
            <strong>⚙️</strong> What code is run and where
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-green-500 text-white w-60 text-sm">
            <strong>🔒</strong> The output is genuine and secure
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;  3 final 

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "/LOGO.svg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0b1120] text-[#e5e7eb] min-h-screen font-sans">
      
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#0b1120] shadow-md sticky top-0 z-50 border-b border-[#a855f7]">
        <div className="text-2xl font-bold text-[#a855f7]">AI Education</div>
        <ul className="flex space-x-6 font-semibold text-[#e5e7eb]">
          <li onClick={() => navigate("/")} className="hover:text-[#a855f7] cursor-pointer">
            Home
          </li>
          <li className="hover:text-[#a855f7] cursor-pointer">Job Details</li>
          <li className="hover:text-[#a855f7] cursor-pointer">Roadmap</li>
          <li className="hover:text-[#a855f7] cursor-pointer">Dashboard</li>
        </ul>
      </nav>

      
      <section className="text-center py-20 px-6 bg-[#0b1120]">
        <motion.h1
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Verify to <span className="text-[#a855f7]">Trust AI</span>
        </motion.h1>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Introducing Verifiable Compute. Ready for the Agentic AI Era.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-10 px-6 py-3 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-full font-semibold transition duration-300"
        >
          Schedule Demo
        </button>
      </section>

      
      <section className="py-20 bg-[#0b1120] px-6">
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#a855f7] mb-6">
          New AI Workflows Equal New Threats
        </h2>
        <p className="text-center text-gray-400 max-w-xl mx-auto mb-10">
          Compromising AI supply chains introduces critical risks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-[#1f2937] rounded-3xl p-8 shadow-lg flex items-center justify-center">
            <span className="text-3xl text-[#a855f7] font-bold">New Threats</span>
          </div>

          <div className="bg-[#1f2937] border border-[#a855f7]/30 rounded-2xl p-8 text-sm text-gray-300 space-y-2">
            <h3 className="text-lg font-semibold text-[#a855f7] mb-4">
              The Problem
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 list-disc pl-5">
              <li>Inserting Backdoors</li>
              <li>Hallucination</li>
              <li>DoS Attacks</li>
              <li>Bias Issues</li>
              <li>Jailbreaks</li>
              <li>Social Engineering</li>
              <li>Data Extraction</li>
              <li>Toxic Output</li>
            </ul>
          </div>
        </div>
      </section>

      
      <section className="bg-[#0b1120] text-center py-20 px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Verifiable Compute <span className="text-[#a855f7]">Verifies</span>
        </motion.h2>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          What data goes in, where it runs, and what comes out — all verifiable.
        </p>

        <div className="flex flex-wrap justify-center mt-10 gap-4">
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            ✅ What data goes into the AI workflow
          </div>
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            ⚙️ What code is run and where
          </div>
          <div className="bg-[#1f2937] p-4 rounded-xl border border-[#a855f7]/30 w-60 text-sm">
            🔒 Output is verified and secure
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;*/

import React from "react";
import { useNavigate } from "react-router-dom";
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
          <li className="hover:text-[#a855f7] cursor-pointer">Dashboard</li>
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
