require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/testAttempts'); // ✅ Import test routes
const roadmapRoutes = require('./routes/roadmap');
const savedRoadmapRoutes = require('./routes/savedroadmaproutes')
const testAttemptRoutes = require('./routes/testAttempts');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes); // ✅ Register test route
app.use('/api/roadmap', roadmapRoutes); // ✅ new route
app.use('/api/saved-roadmaps', savedRoadmapRoutes);
// const testRoutes = require('./routes/testAttempts');
app.use('/api/test', testRoutes);


app.use('/api/test-attempts', testAttemptRoutes);

// ✅ Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
