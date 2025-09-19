const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const SavedRoadmap = require('../models/SavedRoadmap');

// 🔍 Utility: Extract structured steps from roadmap text
const extractSteps = (roadmapText) => {
  const lines = roadmapText.split('\n');
  const steps = [];
  let currentWeek = '';
  let currentDay = '';

  lines.forEach((line) => {
    const trimmed = line.trim();

    const weekMatch = trimmed.match(/Week\s*\d+/i);
    const dayMatch = trimmed.match(/Day\s*\d+/i);
    const taskMatch = trimmed.match(/^(\d+\.|\*|-|•)/);

    if (weekMatch) {
      currentWeek = weekMatch[0];
    } else if (dayMatch) {
      currentDay = dayMatch[0];
    } else if (taskMatch) {
      steps.push({
        title: trimmed.replace(/^(\d+\.|\*|-|•)\s*/, ''),
        week: currentWeek || null,
        day: currentDay || null,
        done: false,
        dueAt: null,
      });
    }
  });

  return steps;
};

// ✅ Save roadmap
router.post('/save', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      role,
      timeline,
      hoursOfStudy,
      marksObtained,
      skillsHave,
      skillsLack,
      roadmap,
    } = req.body;

    if (!roadmap || !role || !title) {
      return res.status(400).json({ message: 'Missing roadmap, role, or title' });
    }

    const steps = extractSteps(roadmap);

    const saved = await SavedRoadmap.create({
      userId: req.user._id,
      title,
      role,
      timeline,
      hoursOfStudy,
      marksObtained,
      skillsHave,
      skillsLack,
      roadmap,
      steps,
      savedAt: new Date(),
    });

    console.log('✅ Roadmap saved with steps:', saved.steps.length);
    res.json({ message: 'Roadmap saved successfully', roadmapId: saved._id });
  } catch (err) {
    console.error('❌ Error saving roadmap:', err);
    res.status(500).json({ message: 'Failed to save roadmap' });
  }
});

// ✅ Fetch all roadmaps for dashboard
router.get('/', authMiddleware, async (req, res) => {
  try {
    const roadmaps = await SavedRoadmap.find({ userId: req.user._id }).sort({ savedAt: -1 });
    console.log(`✅ Fetched ${roadmaps.length} roadmaps for user ${req.user._id}`);
    res.json({ roadmaps });
  } catch (err) {
    console.error('❌ Error fetching roadmaps:', err);
    res.status(500).json({ message: 'Failed to fetch roadmaps' });
  }
});

// ✅ Toggle task completion
router.patch('/:roadmapId/tasks/:taskId', authMiddleware, async (req, res) => {
  try {
    const { roadmapId, taskId } = req.params;
    const { done } = req.body;

    const roadmap = await SavedRoadmap.findOne({ _id: roadmapId, userId: req.user._id });
    if (!roadmap) return res.status(404).json({ message: 'Roadmap not found' });

    const task = roadmap.steps.id(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.done = done;
    await roadmap.save();

    console.log(`✅ Task ${taskId} updated to done=${done}`);
    res.json(roadmap);
  } catch (err) {
    console.error('❌ Error updating task:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

module.exports = router;
