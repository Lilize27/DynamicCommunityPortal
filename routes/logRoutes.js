const express = require('express');
const router = express.Router();
const fs = require('fs');

// POST /login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = fs.existsSync('users.txt')
    ? fs.readFileSync('users.txt', 'utf-8').split('\n')
    : [];

  const userExists = users.some(line => line === `${username},${password}`);
  if (userExists) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: 'Invalid credentials' });
  }
});

// POST /signup
router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const users = fs.existsSync('users.txt')
    ? fs.readFileSync('users.txt', 'utf-8').split('\n')
    : [];

  const userExists = users.some(line => line.startsWith(`${username},`));
  if (userExists) {
    res.json({ success: false, message: 'Username already exists' });
  } else {
    fs.appendFileSync('users.txt', `${username},${password}`);
    res.json({ success: true, message: 'Account created successfully!' });
  }
});

module.exports = router;