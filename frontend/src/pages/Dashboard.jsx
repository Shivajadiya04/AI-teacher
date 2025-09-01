// src/pages/Dashboard.jsx
/*
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="p-12 text-white">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard 🎉</h1>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;*/

import React, { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import DonutChart from "../components/DonutChart";
import DashboardHeader from "../components/DashboardHeader";


const Dashboard = () => {
  const [stats, setStats] = useState({ tasks: 12, points: 450, days: 20 });
  const [lineData, setLineData] = useState([10, 15, 25, 40, 55, 65, 80]);
  const [barData, setBarData] = useState([30, 40, 45, 50, 49, 60, 70]);
  const [donutData, setDonutData] = useState([44, 55, 13, 43, 22]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tasks: prev.tasks + Math.floor(Math.random() * 3),
        points: prev.points + Math.floor(Math.random() * 10),
        days: prev.days + 1
      }));
      setLineData(prev => prev.map(v => v + Math.floor(Math.random() * 5)));
      setBarData(prev => prev.map(v => v + Math.floor(Math.random() * 5)));
      setDonutData(prev => prev.map(v => v + Math.floor(Math.random() * 5)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (

    
    <DashboardLayout>
       {/* Top Header with Profile Pic */}
     <DashboardHeader /> 
      {/* Welcome */}
      <h1 className="text-3xl font-bold mb-2">Welcome, Shiva 👋</h1>
      <p className="text-gray-600 mb-6">Here’s your live dashboard overview</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Tasks</p>
          <h2 className="text-2xl font-bold">{stats.tasks}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Points</p>
          <h2 className="text-2xl font-bold">{stats.points}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-gray-500">Active Days</p>
          <h2 className="text-2xl font-bold">{stats.days}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Progress Over Time</h3>
          <LineChart data={lineData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-2">Category Performance</h3>
          <BarChart data={barData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h3 className="text-lg font-bold mb-2">Task Distribution</h3>
          <DonutChart data={donutData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
