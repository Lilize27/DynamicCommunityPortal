const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const eventsFilePath = path.join(__dirname, '../events.json');

// GET all events
router.get('/', (req, res) => {
  fs.readFile(eventsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).send('Error reading events data');
    }
    try {
      res.json(JSON.parse(data));
    } catch (e) {
      console.error("JSON parse error:", e);
      res.json([]);
    }
  });
});

// POST new event
router.post('/', (req, res) => {
  console.log("Incoming POST body:", req.body);

  const { title, description, time, image, addedBy } = req.body;

  if (!time) return res.status(400).json({ error: 'Time field is required' });

  const newEvent = { title, description, time, image, addedBy };

  fs.readFile(eventsFilePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error reading events');

    let events = [];
    try {
      events = JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse events:", e);
    }

    events.push(newEvent);

    fs.writeFile(eventsFilePath, JSON.stringify(events, null, 2), (err) => {
      if (err) {
        console.error("Write failed:", err);
        return res.status(500).send('Error saving event');
      }
      console.log("Event saved:", newEvent);
      res.status(201).json(newEvent);
    });
  });
});

module.exports = router;