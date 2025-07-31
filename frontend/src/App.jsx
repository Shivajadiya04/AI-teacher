// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import JobRole from './pages/JobRole';
import HomePage from './pages/HomePage';
import EntryLevelTest from './pages/EntryLevelTest';

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
      </Routes>
    </Router>
  );
};

export default App;
