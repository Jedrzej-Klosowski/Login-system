require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MyDB';
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5500';

// Middleware
app.use(express.json()); // Parse JSON from requests
app.use(express.static(path.join(__dirname, '..', 'public'))); // Serve static files

// CORS configuration - allow requests from your frontend
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:5500', 'http://127.0.0.1:5500'], // Add your Vercel URL here
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    console.log('req.body:', req.body); // Debug input data
    console.log('[API] POST /register called! ');

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
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    
    console.log('User registered successfully:', username);
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    console. log('[API] POST /login called!');
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User logged in successfully:', user.email);
    return res.status(200).json({ 
      message: 'Logged in successfully', 
      userId: user._id, 
      email: user.email,
      username: user.username 
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Endpoint to get user information by ID
app.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json({ 
      username: user.username, 
      email: user.email, 
      userId: user._id 
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Connect to MongoDB database
console.log('Attempting to connect to MongoDB...');
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  connectTimeoutMS: 10000,
})
. then(() => {
  console.log('[OK] Connected to MongoDB successfully! ');
  console.log('Database:', mongoose.connection.name);
  
  // Start the server only after successful DB connection
  app.listen(PORT, () => {
    console.log(`[OK] Server running on port ${PORT}`);
    console.log(`[LOG] Environment: ${process.env.NODE_ENV || 'development'}`);
  });
})
.catch(err => {
  console.error('[FAIL] MongoDB connection error:', err.message);
  process.exit(1); // Exit if cannot connect to database
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});