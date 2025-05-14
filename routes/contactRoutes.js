const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const messFilePath = path.join(__dirname, '../messages.json');


if (!fs.existsSync(messFilePath)) {
  fs.writeFileSync(messFilePath, JSON.stringify([]));
}

let messages = [];

try {
  const fileData = fs.readFileSync(messFilePath, 'utf-8');
  messages = fileData.trim() ? JSON.parse(fileData) : [];
} catch (error) {
  console.error('Error reading messages.json:', error);
  messages = [];
}


router.get('/', (req, res) => {
  res.json(messages);
});


router.post('/', (req, res) => {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing data' });
    }
  
    const time = new Date().toLocaleString();
    const newMessage = { name, email, message, time };
    messages.push(newMessage);
  
    fs.writeFile(messFilePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error('Error writing to message.json:', err);
        return res.status(500).send('Failed to save message');
      }
  
      // ✅ Redirect to thank you page
      res.redirect('/thankyou');
    });
  });
  
module.exports = router;