import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const GenerateRoadmap = () => {
  const [formData, setFormData] = useState({
    role: "",
    timeline: "",
    hoursOfStudy: "",
    marksObtained: "",
    skillsHave: [],
    skillsLack: [],
  });

  const [roadmap, setRoadmap] = useState(""); // ✅ roadmap ko store karne ke liye
  const [isLoading, setIsLoading] = useState(false);
  const [isDirectAccess, setIsDirectAccess] = useState(false);

  // 🔹 Load saved data if available
  useEffect(() => {
    const savedRole = localStorage.getItem("jobRole");
    const savedSkillsHave = JSON.parse(localStorage.getItem("skillsYouHave") || "[]");
    const savedSkillsLack = JSON.parse(localStorage.getItem("skillsYouLack") || "[]");
    const savedMarks = localStorage.getItem("testMarks");

    if (savedRole || savedSkillsHave.length > 0 || savedSkillsLack.length > 0 || savedMarks) {
      setFormData({
        role: savedRole || "",
        timeline: "",
        hoursOfStudy: "",
        marksObtained: savedMarks || "",
        skillsHave: savedSkillsHave,
        skillsLack: savedSkillsLack,
      });
      setIsDirectAccess(false); 
    } else {
      setIsDirectAccess(true); 
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setRoadmap("");

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setRoadmap(data.roadmap); // ✅ roadmap state me store ho gaya
      } else {
        alert(data.message || "Failed to generate roadmap");
      }
    } catch (err) {
      console.error("❌ Error generating roadmap:", err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-[#0F172A] text-white min-h-screen">
      <Sidebar />
      <div className="ml-64 w-full p-6 grid grid-cols-2 gap-6">
        
        {/* LEFT SIDE: Form */}
        <div>
          <h1 className="text-3xl font-bold mb-6">Generate Roadmap</h1>

          {/* Role */}
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={!isDirectAccess && formData.role}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <label className="block mb-1">Timeline (in months)</label>
            <input
              type="number"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          {/* Hours of Study */}
          <div className="mb-4">
            <label className="block mb-1">Hours of study per day</label>
            <input
              type="number"
              name="hoursOfStudy"
              value={formData.hoursOfStudy}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          {/* Marks */}
          <div className="mb-4">
            <label className="block mb-1">Marks Obtained</label>
            <input
              type="text"
              name="marksObtained"
              value={formData.marksObtained}
              onChange={handleChange}
              disabled={isDirectAccess}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          {/* Skills Have */}
          <div className="mb-4">
            <label className="block mb-1">Skills You Have</label>
            <input
              type="text"
              name="skillsHave"
              value={formData.skillsHave.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsHave: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              disabled={!isDirectAccess && formData.skillsHave.length > 0}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          {/* Skills Lack */}
          <div className="mb-4">
            <label className="block mb-1">Skills You Lack</label>
            <input
              type="text"
              name="skillsLack"
              value={formData.skillsLack.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  skillsLack: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              disabled={!isDirectAccess && formData.skillsLack.length > 0}
              className="w-full p-3 rounded bg-[#1E293B]"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-6 py-2 rounded text-white font-semibold"
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* RIGHT SIDE: Roadmap */}
        <div className="bg-[#1E293B] p-6 rounded-xl shadow-md overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">📌 Your Roadmap</h2>
          {isLoading && <p>⏳ Please wait, generating roadmap...</p>}
          {!isLoading && roadmap && (
            <pre className="whitespace-pre-wrap leading-relaxed">{roadmap}</pre>
          )}
          {!isLoading && !roadmap && (
            <p className="text-gray-400">Roadmap will appear here after generation.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateRoadmap;
