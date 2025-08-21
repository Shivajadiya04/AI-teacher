import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const JobRole = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: '',
    jobRole: '',
    skillsRequired: '',
    skillsYouHave: '',
  });

  const [compared, setCompared] = useState(false);
  const [result, setResult] = useState({ matched: [], lacking: [] });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompare = () => {
    const required = formData.skillsRequired.split(',').map(s => s.trim().toLowerCase());
    const have = formData.skillsYouHave.split(',').map(s => s.trim().toLowerCase());

    const matched = have.filter(skill => required.includes(skill));
    const lacking = required.filter(skill => !have.includes(skill));

    setResult({ matched, lacking });
    setCompared(true);

    // 💾 Save to localStorage (extra info for roadmap)
    localStorage.setItem('skillsYouHave', JSON.stringify(matched));
    localStorage.setItem('skillsYouLack', JSON.stringify(lacking));
    localStorage.setItem('jobRole', formData.jobRole);
    localStorage.setItem('companyName', formData.companyName);
  };

  const handleTestRedirect = () => {
    navigate('/entry-level-test');
  };

  return (
    <div className="flex bg-[#0F172A] text-white min-h-screen">
      <Sidebar />

      <div className="ml-64 flex items-center justify-center w-full px-6 py-12">
        <div className="space-y-6 max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Enter Job Details</h1>

          <div>
            <label className="block mb-1">Company name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1E293B] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Job role</label>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#1E293B] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Skills required</label>
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              placeholder="e.g., Python, React, MongoDB"
              className="w-full p-3 rounded bg-[#1E293B] text-white"
            />
          </div>

          <div>
            <label className="block mb-1">Skills you have:</label>
            <input
              type="text"
              name="skillsYouHave"
              value={formData.skillsYouHave}
              onChange={handleChange}
              placeholder="e.g., Python, SQL"
              className="w-full p-3 rounded bg-[#1E293B] text-white"
            />
          </div>

          {compared && (
            <div className="p-4 rounded bg-[#1E293B] border border-[#334155]">
              <p><strong>Skills you have:</strong> {result.matched.join(', ') || 'None'}</p>
              <p><strong>Skills you lack:</strong> {result.lacking.join(', ') || 'None'}</p>
            </div>
          )}

          <button
            onClick={compared ? handleTestRedirect : handleCompare}
            className="mt-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6 py-2 rounded font-semibold w-full"
          >
            {compared ? 'Attempt Test' : 'Compare'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobRole;
