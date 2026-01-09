const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON from requests
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files
app.use(cors()); // Allow requests from other domains

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    console.log('req.body:', req.body); // Debug input data
    console.log('[API] POST /register called!');

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    return res.status(200).json({ message: 'Logged in successfully', userId: user._id, email: user.email });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get user information by ID
app.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ username: user.username, email: user.email, userId: user._id });
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/MyDB', {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  connectTimeoutMS: 5000
}).then(() => {
  console.log('✅ Connected to MongoDB');
  // Start server only after database connection
  app.listen(3000, () => {
    console.log('🌍 Server running on http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error('Make sure MongoDB is running on mongodb://127.0.0.1:27017');
  process.exit(1); // Exit process if database connection fails
});

