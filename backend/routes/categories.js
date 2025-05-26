const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all categories
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Get category by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(results[0]);
  });
});

// Create category
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: results.insertId, name });
  });
});

// Update category
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category updated' });
  });
});

// Delete category
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Category deleted' });
  });
});

module.exports = router;
