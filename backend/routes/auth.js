const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ firstName, lastName, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login attempt:', email);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });}

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found');
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('🔐 User found:', user);

    if (!user.password) {
      console.log('⚠️ User has no password field');
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    if (!process.env.JWT_SECRET) {
      console.log('🚨 Missing JWT_SECRET in .env');
      return res.status(500).json({ success: false, message: 'Server config error' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    console.log('✅ Login successful');
    return res.json({
      success: true,
      token,
      user: {
        email: user.email,
        id: user._id
      }
    });
  } catch (err) {
    console.error('🚨 Login error:', err);
    return res.status(500).json({ success: false, message: 'Login error' });
  }
});


// 🔐 Protected route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ success: true, message: `Welcome, ${req.user.email}` });
});

module.exports = router;
