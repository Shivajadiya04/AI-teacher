require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test'); // ✅ Import test routes
const roadmapRoutes = require('./routes/roadmap');
const savedRoadmapRoutes = require('./routes/savedroadmaproutes')

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes); // ✅ Register test route
app.use('/api/roadmap', roadmapRoutes); // ✅ new route
app.use('/api/saved-roadmaps', savedRoadmapRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
