const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let lastGeneratedQuestions = []; // ✅ Store last questions temporarily

// ✅ Route: POST /api/test/generate
router.post('/generate', async (req, res) => {
  const { skills } = req.body;

  if (!skills || skills.trim() === '') {
    return res.status(400).json({ error: 'Skills input is required' });
  }

  const prompt = `
You are a technical interviewer.

Based on the following skills: [${skills}], generate EXACTLY 20 medium-level multiple-choice interview questions.

Timestamp: ${Date.now()}

Guidelines:
- Cover all the listed skills.
- Each question must include:
  • "question": string
  • "options": array of 4 strings
  • "answer": string (must match one of the options)
  • "explanation": string explaining the correct answer
- Return a raw valid JSON array like:
[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "answer": "...",
    "explanation": "..."
  }
]
`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GEMINI_API_KEY
        }
      }
    );

    console.log('📨 Prompt sent to Gemini:', prompt);
    console.log('📦 Gemini raw response:', JSON.stringify(response.data, null, 2));


    let raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    raw = raw.trim();

    // Remove markdown code block wrappers if any
    if (raw.startsWith('```')) {
      raw = raw.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
    }

    // Attempt to extract just the array part if extra text is present
    const match = raw.match(/\[\s*{[\s\S]*}\s*\]/);

    if (!match) {
      console.error('⚠️ No valid JSON array found in response:\n', raw);
      return res.status(500).json({ error: 'AI response does not contain a valid JSON array.' });
    }

    let questions;
    try {
      questions = JSON.parse(match[0]);
    } catch (jsonErr) {
      console.error('⚠️ JSON parsing failed. Extracted:\n', match[0]);
      return res.status(500).json({ error: 'AI response was not valid JSON.' });
    }

    lastGeneratedQuestions = questions; // ✅ Store
    res.json({ questions });
  } catch (error) {
    console.error('❌ Error generating test:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate test questions' });
  }
});

// ✅ Route: POST /api/test/submit (Now also saves marks in DB)
router.post('/submit', authMiddleware, async (req, res) => {
  const { userAnswers } = req.body;

  if (!Array.isArray(userAnswers)) {
    return res.status(400).json({ error: 'userAnswers must be an array' });
  }

  if (!lastGeneratedQuestions.length) {
    return res.status(400).json({ error: 'No test questions found. Please generate test first.' });
  }

  const normalize = (str) =>
    (typeof str === 'string' ? str : String(str))
      .replace(/^["']|["']$/g, '')
      .trim()
      .toLowerCase();

  const formattedQuestions = lastGeneratedQuestions.map((q, index) => {
    const user = userAnswers[index] || '';
    const correctAnswer = q.answer;

    return {
      index,
      question: q.question,
      options: q.options,
      correctAnswer,
      userAnswer: user,
      match: normalize(user) === normalize(correctAnswer),
      explanation: q.explanation || 'No explanation provided.',
    };
  });

  const correctCount = formattedQuestions.filter(q => q.match).length;
  const percentage = Math.round((correctCount / formattedQuestions.length) * 100);

  // ✅ Save marks to DB for logged-in user
  try {
    await User.findByIdAndUpdate(req.user.id, { marksObtained: percentage });
  } catch (err) {
    console.error('❌ Error saving marks:', err);
  }

  res.json({
    questions: formattedQuestions,
    total: formattedQuestions.length,
    correct: correctCount,
    percentage
  });
});

module.exports = router;
