const express = require('express');
const router = express.Router();
const { 
  addBook,
  getAllBooks,
  getAvailableBooks,
  borrowBook,
  returnBook
} = require('../models/library');

// Add a new book
router.post('/', (req, res) => {
  const { title, author } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author required' });
  }
  
  const newBook = addBook(title, author);
  res.status(201).json(newBook);
});

// Get all books
router.get('/', (req, res) => {
  res.json(getAllBooks());
});

// Get only available books
router.get('/available', (req, res) => {
  res.json(getAvailableBooks());
});

// Borrow a book by ID
router.put('/borrow/:id', (req, res) => {
  const result = borrowBook(req.params.id);
  
  if (result.error) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Return a borrowed book
router.put('/return/:id', (req, res) => {
  const result = returnBook(req.params.id);
  
  if (result.error) {
    return res.status(400).json(result);
  }
  
  res.json(result);
});

module.exports = router;