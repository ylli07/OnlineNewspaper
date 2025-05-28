const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Signup attempt for username: ${username} at ${new Date().toLocaleString()}`);

  // Validate input
  if (!username || !password) {
    console.log('Signup failed: Missing username or password');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Check if username already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Error checking username:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length > 0) {
        console.log(`Signup failed: Username ${username} already exists`);
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
      db.query(query, [username, hashedPassword, 'user'], (err, result) => {
        if (err) {
          console.error('Error creating user:', err);
          return res.status(500).json({ message: 'Error creating user' });
        }

        console.log(`User ${username} created successfully at ${new Date().toLocaleString()}`);
        res.status(201).json({ message: 'User created successfully' });
      });
    });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt for username: ${username} at ${new Date().toLocaleString()}`);

  // Validate input
  if (!username || !password) {
    console.log('Login failed: Missing username or password');
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        console.log(`Login failed: User ${username} not found`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Password match for ${username}: ${isMatch}`);

      if (!isMatch) {
        console.log(`Login failed: Invalid password for user ${username}`);
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        'your-secret-key',
        { expiresIn: '1h' }
      );

      console.log(`User ${username} logged in successfully at ${new Date().toLocaleString()}`);
      
      // Send user data and token
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        user: userWithoutPassword,
        token
      });
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this new route after the existing routes
router.post('/setup-admin', async (req, res) => {
  try {
    console.log('Starting admin setup...');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin1', salt);
    console.log('Generated hash:', hashedPassword);

    // Delete existing admin if exists
    console.log('Deleting existing admin...');
    db.query('DELETE FROM users WHERE username = ?', ['admin'], (err, result) => {
      if (err) {
        console.error('Error deleting existing admin:', err);
        return res.status(500).json({ message: 'Error deleting existing admin' });
      }
      console.log('Existing admin deleted');

      // Insert new admin
      console.log('Inserting new admin...');
      const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
      db.query(query, ['admin', hashedPassword, 'admin'], (err, result) => {
        if (err) {
          console.error('Error creating admin:', err);
          return res.status(500).json({ message: 'Error creating admin user' });
        }
        console.log('Admin user created successfully');
        res.status(201).json({ message: 'Admin user created successfully' });
      });
    });
  } catch (error) {
    console.error('Error in setup-admin:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
      // Decode the token to get user information
      const decoded = jwt.verify(token, 'your-secret-key');
      console.log(`User ${decoded.username} logged out at ${new Date().toLocaleString()}`);
    }

    // In a real application, you might want to:
    // 1. Blacklist the token
    // 2. Clear any server-side sessions
    // 3. Update user's last logout time in database
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 