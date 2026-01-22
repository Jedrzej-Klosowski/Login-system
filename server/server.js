require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/MyDB';
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  console.log('[LOG] Health check called');
  res.status(200).json({ status: 'OK', message:  'Server is running' });
});

// User registration endpoint
app.post('/register', async (req, res) => {
  try {
    console.log('====== REGISTER REQUEST ======');
    console.log('Body:', req.body);

    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (password.length < 6) {
      console.log('Password too short');
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      console.log('User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    
    console.log('[LOG] Saving user...');
    await user.save();
    console.log('[OK] User registered:', username);
    
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('[FAIL] Registration error:', err);
    return res.status(500).json({ message: 'Server error:  ' + err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    console.log('====== LOGIN REQUEST ======');
    console.log('Body:', req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log('Missing fields');
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('[OK] User logged in:', user.email);
    return res.status(200).json({ 
      message: 'Logged in successfully', 
      userId: user._id, 
      email: user.email,
      username: user.username 
    });
  } catch (err) {
    console.error('[FAIL] Login error:', err);
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Get user by ID endpoint
app.get('/user/:userId', async (req, res) => {
  try {
    console.log('====== GET USER REQUEST ======');
    const { userId } = req.params;
    console.log('userId:', userId);
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId format');
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('[OK] User found:', user.username);
    return res.status(200).json({ 
      username: user.username, 
      email: user.email, 
      userId: user._id 
    });
  } catch (err) {
    console.error('[FAIL] Error fetching user:', err);
    return res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// 404 handler
app.use((req, res) => {
  console.log('[FAIL] 404 - Route not found:', req.method, req.path);
  res.status(404).json({ message: 'Route not found' });
});

// Connect to MongoDB
console.log('========================================');
console.log('Starting server.. .');
console.log('MongoDB URI:', MONGODB_URI ?  'Set (hidden)' : 'NOT SET');
console.log('========================================');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('[OK] Connected to MongoDB successfully!');
  console.log('Database:', mongoose.connection.name);
  
  app.listen(PORT, () => {
    console.log('========================================');
    console.log(`[OK] Server running on port ${PORT}`);
    console.log(`[LOG] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('========================================');
    console.log('Available routes:');
    console.log('  GET  /health');
    console.log('  POST /register');
    console.log('  POST /login');
    console.log('  GET  /user/:userId');
    console.log('========================================');
  });
})
.catch(err => {
  console.error('[FAIL] MongoDB connection error:', err.message);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});