// backend/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // localhost
  user: process.env.DB_USER,       // 'root'
  password: process.env.DB_PASSWORD,  // leave empty if no password
  database: 'onlinenewspaper',     // Use your database name here
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Use routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/auth/logout', authMiddleware);
app.use('/api/news', authMiddleware); // Protect news routes

// Simple test route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Sample route to fetch articles (example)
app.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) {
      console.error('Error fetching articles:', err);
      res.status(500).send('Error fetching articles');
    } else {
      res.json(results);
    }
  });
});

// Add this after your existing routes
app.get('/api/news', (req, res) => {
  // Sample news data
  const news = [
    {
      id: 1,
      title: 'Breaking News Story',
      summary: 'This is a sample news story',
      category: 'World',
      imageUrl: 'https://via.placeholder.com/400x250'
    },
    {
      id: 2,
      title: 'Sports Update',
      summary: 'Latest sports news and updates',
      category: 'Sports',
      imageUrl: 'https://via.placeholder.com/400x250'
    },
    {
      id: 3,
      title: 'Technology News',
      summary: 'Latest in technology',
      category: 'Technology',
      imageUrl: 'https://via.placeholder.com/400x250'
    }
  ];
  
  res.json(news);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
