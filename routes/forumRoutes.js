const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const forumFilePath = path.join(__dirname, '../forum.json');

// Ensure file exists and has valid JSON
if (!fs.existsSync(forumFilePath)) {
  fs.writeFileSync(forumFilePath, JSON.stringify([]));
}

let messages = [];

try {
  const fileData = fs.readFileSync(forumFilePath, 'utf-8');
  messages = fileData.trim() ? JSON.parse(fileData) : [];
} catch (error) {
  console.error('Error reading forum.json:', error);
  messages = [];
}

// GET messages
router.get('/', (req, res) => {
  res.json(messages);
});

// POST message
router.post('/', (req, res) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res.status(400).json({ error: 'Missing data' });
  }

  const time = new Date().toLocaleString();
  const newMessage = { username, message, time };
  messages.push(newMessage);

  fs.writeFile(forumFilePath, JSON.stringify(messages, null, 2), (err) => {
    if (err) {
      console.error('Error writing to forum.json:', err);
      return res.status(500).json({ error: 'Failed to save message' });
    }

    res.status(201).json({ success: true });
  });
});

module.exports = router;