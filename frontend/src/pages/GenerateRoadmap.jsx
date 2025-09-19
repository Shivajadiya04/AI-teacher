import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import  jsPDF  from "jspdf"; 
import { Save } from "lucide-react"; // ✅ Save icon

const GenerateRoadmap = () => {
  const [formData, setFormData] = useState({
  title: "", // ✅ NEW
  role: "",
  timeline: "",
  hoursOfStudy: "",
  marksObtained: "",
  skillsHave: [],
  skillsLack: [],
});

  const [roadmap, setRoadmap] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDirectAccess, setIsDirectAccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 🔹 Load saved data if available
  useEffect(() => {
    const savedRole = localStorage.getItem("jobRole");
    const savedSkillsHave = JSON.parse(localStorage.getItem("skillsYouHave") || "[]");
    const savedSkillsLack = JSON.parse(localStorage.getItem("skillsYouLack") || "[]");
    const savedMarks = localStorage.getItem("testMarks");

    if (savedRole || savedSkillsHave.length > 0 || savedSkillsLack.length > 0 || savedMarks) {
      setFormData({
        role: savedRole || '',
        timeline: '',
        hoursOfStudy: '',
        marksObtained: savedMarks || '',
        skillsHave: savedSkillsHave || [],
        skillsLack: savedSkillsLack || [],
      });

      setIsDirectAccess(false);
    } else {
      setIsDirectAccess(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Generate roadmap
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
        setRoadmap(data.roadmap);
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

  console.log('📤 Saving roadmap with:', {
  ...formData,
  roadmap   
  });

  // ✅ Save roadmap to DB
  const handleSave = async () => {
    if (!roadmap) return alert("No roadmap to save!");

    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      console.log('📤 Saving roadmap with:', {
        ...formData,
        roadmap
      });

      console.log("📤 Saving roadmap with title:", formData.title);

      const res = await fetch("http://localhost:5000/api/saved-roadmaps/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          roadmap,
        })

      }); 

      const data = await res.json();
      if (res.ok) {
        alert("✅ Roadmap saved successfully!");
      } else {
        alert(data.message || "Failed to save roadmap");
      }
    } catch (err) {
      console.error("❌ Error saving roadmap:", err);
      alert("Something went wrong while saving!");
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Download roadmap as PDF
  const handleDownloadPDF = () => {
    if (!roadmap) return alert("No roadmap to download!");

    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const textLines = doc.splitTextToSize(roadmap, 180);
    let y = 20;

    textLines.forEach((line) => {
      if (y > pageHeight - 10) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, 10, y);
      y += 7;
    });

    doc.save(`${formData.role || "roadmap"}.pdf`);
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
            <div className="mb-4">
              <label className="block mb-1">Roadmap Title</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#1E293B]"
              />
            </div>

            <label className="block mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role || ''}
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
              value={formData.timeline || ''}
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
              value={formData.hoursOfStudy || ''}
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
              value={formData.marksObtained || ''}
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
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-6 py-2 rounded text-white font-semibold mr-4"
          >
            {isLoading ? "Generating..." : "Generate"}
          </button>

          {roadmap && (
            <button
              onClick={handleDownloadPDF}
              className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-semibold"
            >
              Download PDF
            </button>
          )}
        </div>

        {/* RIGHT SIDE: Roadmap */}
        <div className="relative bg-[#1E293B] p-6 rounded-xl shadow-md h-[600px] overflow-y-scroll">
          {/* Save Button Icon */}
          {roadmap && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] transition"
              title="Save Roadmap"
            >
              <Save size={20} />
            </button>
          )}

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
