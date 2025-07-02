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
// app.use('/api/news', authMiddleware); // Protect news routes
// app.use('/api/featured', authMiddleware); // Protect featured routes (if added)

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

// Featured content endpoints
app.get('/api/featured', (req, res) => {
  db.query('SELECT * FROM featured_content LIMIT 1', (err, results) => {
    if (err) {
      console.error('Error fetching featured content:', err);
      return res.status(500).json({ error: 'Error fetching featured content' });
    }
    res.json(results[0] || {});
  });
});

app.put('/api/featured/:id', (req, res) => {
  const { image_url, description } = req.body;
  const { id } = req.params;
  console.log('PUT /api/featured/:id', { id, image_url, description });
  db.query('UPDATE featured_content SET image_url=?, description=? WHERE id=?', [image_url, description, id], (err, result) => {
    if (err) {
      console.error('Error updating featured content:', err);
      return res.status(500).json({ error: 'Error updating featured content' });
    }
    if (result.affectedRows === 0) {
      // No row updated, maybe id does not exist
      return res.status(404).json({ error: 'No featured content found with this id' });
    }
    res.json({ id, image_url, description });
  });
});

// Latest news content endpoints
app.get('/api/latest-news', (req, res) => {
  db.query('SELECT * FROM latest_news LIMIT 1', (err, results) => {
    if (err) {
      console.error('Error fetching latest news content:', err);
      return res.status(500).json({ error: 'Error fetching latest news content' });
    }
    res.json(results[0] || {});
  });
});

app.put('/api/latest-news/:id', (req, res) => {
  const { image_url, description } = req.body;
  const { id } = req.params;
  console.log('PUT /api/latest-news/:id', { id, image_url, description });
  db.query('UPDATE latest_news SET image_url=?, description=? WHERE id=?', [image_url, description, id], (err, result) => {
    if (err) {
      console.error('Error updating latest news content:', err);
      return res.status(500).json({ error: 'Error updating latest news content' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No latest news content found with this id' });
    }
    res.json({ id, image_url, description });
  });
});

// Photo gallery endpoints (using news table)
app.get('/api/gallery', (req, res) => {
  db.query('SELECT id, image_url, image_caption, gallery_order FROM news WHERE gallery_order IS NOT NULL ORDER BY gallery_order ASC', (err, results) => {
    if (err) {
      console.error('Error fetching gallery:', err);
      return res.status(500).json({ error: 'Error fetching gallery' });
    }
    res.json(results);
  });
});

app.put('/api/gallery/:id', (req, res) => {
  const { image_url, image_caption, gallery_order } = req.body;
  const { id } = req.params;
  console.log('PUT /api/gallery/:id', { id, image_url, image_caption, gallery_order });
  db.query('UPDATE news SET image_url=?, image_caption=?, gallery_order=? WHERE id=?', [image_url, image_caption, gallery_order, id], (err, result) => {
    if (err) {
      console.error('Error updating gallery item:', err);
      return res.status(500).json({ error: 'Error updating gallery item' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'No gallery item found with this id' });
    }
    res.json({ id, image_url, image_caption, gallery_order });
  });
});

app.post('/api/gallery', (req, res) => {
  const { image_url, image_caption, gallery_order } = req.body;
  console.log('POST /api/gallery received:', { image_url, image_caption, gallery_order });
  const sql = 'INSERT INTO news (image_url, image_caption, gallery_order, title, content, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [image_url, image_caption, gallery_order, 'Gallery Item', 'Gallery content', null, null], (err, result) => {
    if (err) {
      console.error('Error adding gallery item:', err);
      return res.status(500).json({ error: 'Error adding gallery item' });
    }
    console.log('Gallery item added successfully:', { id: result.insertId, image_url, image_caption, gallery_order });
    res.json({ id: result.insertId, image_url, image_caption, gallery_order });
  });
});

// Sports content endpoints (using news table)
app.get('/api/sports-content', (req, res) => {
  db.query('SELECT id, image_url, image_caption, sports_order FROM news WHERE sports_order IS NOT NULL ORDER BY sports_order ASC LIMIT 2', (err, results) => {
    if (err) {
      console.error('Error fetching sports content:', err);
      return res.status(500).json({ error: 'Error fetching sports content' });
    }
    // Return the first two sports items
    res.json(results.slice(0, 2));
  });
});

app.put('/api/sports-content/:id', (req, res) => {
  const { image_url, image_caption, sports_order } = req.body;
  const { id } = req.params;
  console.log('PUT /api/sports-content/:id', { id, image_url, image_caption, sports_order });
  db.query('UPDATE news SET image_url=?, image_caption=?, sports_order=? WHERE id=?', [image_url, image_caption, sports_order, id], (err, result) => {
    if (err) {
      console.error('Error updating sports content:', err);
      return res.status(500).json({ error: 'Error updating sports content' });
    }
    console.log('Sports content updated successfully');
    res.json({ id, image_url, image_caption, sports_order });
  });
});

app.post('/api/sports-content', (req, res) => {
  const { image_url, image_caption, sports_order } = req.body;
  console.log('POST /api/sports-content received:', { image_url, image_caption, sports_order });
  const sql = 'INSERT INTO news (image_url, image_caption, sports_order, title, content, category_id, author_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [image_url, image_caption, sports_order, 'Sports Item', 'Sports content', null, null], (err, result) => {
    if (err) {
      console.error('Error adding sports content:', err);
      return res.status(500).json({ error: 'Error adding sports content' });
    }
    console.log('Sports content added successfully:', { id: result.insertId, image_url, image_caption, sports_order });
    res.json({ id: result.insertId, image_url, image_caption, sports_order });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
