const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

// Use your OpenRouter API key here
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1', // Required if you're using OpenRouter
});

// POST /api/test/generate
router.post('/generate', async (req, res) => {
  const { skills } = req.body;

  if (!skills || skills.trim() === '') {
    return res.status(400).json({ error: 'Skills input is required' });
  }

  try {
    const randomTag = Math.floor(Math.random() * 100000); // force variation
   const prompt = `
You are a technical interviewer.

Based on the following skills:[${skills}], generate EXACTLY 30 medium-level multiple-choice interview questions.

Timestamp (for uniqueness): ${Date.now()}

Guidelines:
- The questions should collectively cover all the listed skills.
- Some questions may involve more than one skill if relevant.
- Each question must include:
  • "question": string
  • "options": array of 4 strings
  • "answer": string (must exactly match one of the options)
- The difficulty should be intermediate.
- Do NOT include explanations, markdown, or formatting.
- ONLY return a raw valid JSON array like:

[
  {
    "question": "Which HTML element is used for inserting a line break?",
    "options": ["<break>", "<lb>", "<br>", "<line>"],
    "answer": "<br>"
  },
  ...
]
`;


    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 4000,
      temperature: 0.8,
    });

    let raw = completion.choices[0].message.content;
    raw = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, '');

    let questions;
    try {
      questions = JSON.parse(raw);
    } catch (jsonErr) {
      console.error('⚠️ JSON parsing failed. Response was:\n', raw);
      return res.status(500).json({ error: 'AI response was not valid JSON. Check format or try again.' });
    }

    // ✅ Send the questions to the frontend
    res.json({ questions });

  } catch (error) {
    console.error('❌ Error generating test:', error);
    res.status(500).json({ error: 'Failed to generate test questions' });
  }
});

module.exports = router;
