// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
//import Sidebar from './components/Sidebar';
import JobRole from './pages/JobRole';
import HomePage from './pages/HomePage';
import EntryLevelTest from './pages/EntryLevelTest';
import TestReview from './pages/TestReview';
import GenerateRoadmap from './pages/GenerateRoadmap';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobrole" element={<JobRole />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/entry-level-test" element={<EntryLevelTest />} />
        <Route path="/review" element={<TestReview />} />
        <Route path="/roadmap" element={<GenerateRoadmap />} />
      </Routes>
    </Router>
  );
};

export default App;
