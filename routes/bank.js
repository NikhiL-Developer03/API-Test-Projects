// routes/bank.js

const express = require('express');
const router = express.Router();
const {
  createAccount,
  getAllAccounts,
  deposit,
  withdraw,
  transfer
} = require('../models/bank');

// Create a new bank account
router.post('/accounts', (req, res) => {
  const { name, balance } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Account holder name required' });
  }

  if (typeof balance !== 'number' || balance < 0) {
    return res.status(400).json({ error: 'Balance must be a non-negative number' });
  }

  const newAccount = createAccount(name, balance);
  res.status(201).json(newAccount);
});

// Get all bank accounts
router.get('/accounts', (req, res) => {
  res.json(getAllAccounts());
});

// Deposit money into an account
router.put('/deposit/:id', (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  const result = deposit(req.params.id, amount);

  if (result.error) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// Withdraw money from an account
router.put('/withdraw/:id', (req, res) => {
  const { amount } = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  const result = withdraw(req.params.id, amount);

  if (result.error) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// Transfer money between accounts
router.put('/transfer', (req, res) => {
  const { fromId, toId, amount } = req.body;

  if (!fromId || !toId) {
    return res.status(400).json({ error: 'Source and destination account IDs required' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }

  const result = transfer(fromId, toId, amount);

  if (result.error) {
    return res.status(400).json(result);
  }

  res.json(result);
});

module.exports = router;