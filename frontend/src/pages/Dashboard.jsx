import React, { useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import DashboardHeader from '../components/DashboardHeader';
import Sidebar from '../components/Sidebar';
import AttemptsTable from '../components/AttemptsTable';
import RoadmapTasks from '../components/RoadmapTasks';
import ProgressPie from '../components/ProgressPie';
import { apiGet, apiPatch } from '../../utils/api';

const Dashboard = () => {
  const [sideOpen, setSideOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(null);
  const [attempts, setAttempts] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [rms, atts] = await Promise.all([
        apiGet('/api/saved-roadmaps'),
        apiGet('/api/test/attempts'),
      ]);

      const roadmapArray = Array.isArray(rms?.roadmaps)
        ? rms.roadmaps
        : Array.isArray(rms)
        ? rms
        : [];

      setRoadmaps(roadmapArray);
      setAttempts(atts);

      if (roadmapArray.length > 0) {
        setSelectedRoadmapId((prevId) => prevId || roadmapArray[0]._id);
      }
    } catch (e) {
      console.error('❌ Dashboard fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const selectedRoadmap = useMemo(
    () => roadmaps.find((r) => r._id === selectedRoadmapId) || null,
    [roadmaps, selectedRoadmapId]
  );

  const progressCounts = useMemo(() => {
    if (!selectedRoadmap || !Array.isArray(selectedRoadmap.steps)) {
      return { completed: 0, pending: 0, due: 0 };
    }

    const completed = selectedRoadmap.steps.filter((s) => s.done).length;
    const pending = selectedRoadmap.steps.length - completed;
    const due = selectedRoadmap.steps.filter(
      (s) => !s.done && s.dueAt && new Date(s.dueAt) < new Date()
    ).length;

    return { completed, pending, due };
  }, [selectedRoadmap]);

  const onToggleTask = async (roadmapId, taskId, done) => {
    try {
      const updatedRoadmap = await apiPatch(
        `/api/saved-roadmaps/${roadmapId}/tasks/${taskId}`,
        { done }
      );

      setRoadmaps((prev) =>
        prev.map((r) => (r._id === updatedRoadmap._id ? updatedRoadmap : r))
      );
    } catch (e) {
      console.error(e);
      alert('Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700">
      <div className="flex">
        <Sidebar
          active="dashboard"
          onToggle={() => setSideOpen(!sideOpen)}
          open={sideOpen}
        />

        <main className={`flex-1 transition-all ${sideOpen ? 'ml-64' : 'ml-20'}`}>
          <DashboardHeader title="Dashboard" />

          <div className="p-4 md:p-6 space-y-6">
            {/* Top row: selector + progress chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-500 rounded-xl p-4 lg:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Your Roadmaps
                  </h3>
                  <select
                    className="bg-gray-100 dark:bg-gray-800 text-white rounded px-3 py-2 text-sm"
                    value={selectedRoadmapId || ''}
                    onChange={(e) => setSelectedRoadmapId(e.target.value)}
                  >
                    {roadmaps.map((r) => (
                      <option key={r._id} value={r._id}>
                        {r.title || 'Untitled'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ✅ Scrollable roadmap task list */}
                <div className="max-h-[400px] overflow-y-auto pr-2">
                  <RoadmapTasks
                    roadmap={selectedRoadmap}
                    onToggle={onToggleTask}
                  />
                </div>
              </div>

              <ProgressPie
                completed={progressCounts.completed}
                pending={progressCounts.pending}
                due={progressCounts.due}
              />
            </div>

            {/* Attempts */}
            <AttemptsTable attempts={attempts} onRefresh={fetchDashboardData} />
          </div>
        </main>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center text-white">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
