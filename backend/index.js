require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/testAttempts');
const roadmapRoutes = require('./routes/roadmap');
const savedRoadmapRoutes = require('./routes/savedroadmaproutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
console.log('🌐 CORS allowed origin:', process.env.FRONTEND_URL);

app.use(express.json());

// Serve uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/saved-roadmaps', savedRoadmapRoutes);
app.use('/api/test-attempts', testRoutes); // optional, if you need another path

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
