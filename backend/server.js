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

// Replace the hardcoded /api/news endpoint with a real one
app.get('/api/news', (req, res) => {
  const sql = 'SELECT * FROM news ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching news:', err);
      return res.status(500).json({ error: 'Error fetching news' });
    }
    res.json(results);
  });
});

// Add endpoint to create news
app.post('/api/news', (req, res) => {
  const { title, content, image_url, image_caption, category_id, author_id } = req.body;
  const sql = 'INSERT INTO news (title, content, image_url, image_caption, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, content, image_url, image_caption, category_id, author_id], (err, result) => {
    if (err) {
      console.error('Error adding news:', err);
      return res.status(500).json({ error: 'Error adding news' });
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// Add endpoint to update news
app.put('/api/news/:id', (req, res) => {
  const { title, content, image_url, image_caption, category_id, author_id } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE news SET title=?, content=?, image_url=?, image_caption=?, category_id=?, author_id=? WHERE id=?';
  db.query(sql, [title, content, image_url, image_caption, category_id, author_id, id], (err, result) => {
    if (err) {
      console.error('Error updating news:', err);
      return res.status(500).json({ error: 'Error updating news' });
    }
    res.json({ id, ...req.body });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
