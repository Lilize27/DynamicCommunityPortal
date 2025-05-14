// routes/pageRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path');


const forumFilePath = path.join(__dirname, '../forum.json');

function parseDate(dateStr) {
  return new Date(dateStr);
}

router.get("/", (req, res) => {
  let forumMessages = [];
  let latestThreeEvents = [];

  
  try {
    const eventsData = fs.readFileSync(eventsFilePath, "utf-8");
    const events = eventsData.trim() ? JSON.parse(eventsData) : [];

    const sortedEvents = events.sort((a, b) => parseDate(b.time) - parseDate(a.time));
    latestThreeEvents = sortedEvents.slice(0, 3);
  } catch (err) {
    console.error("Error loading events:", err);
  }

  
  try {
    const data = fs.readFileSync(forumFilePath, "utf-8");
    forumMessages = data.trim() ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error reading forum.json:", err);
  }

  
  res.render("pages/home", {
    events: latestThreeEvents,
    forumMessages,
  });
});

router.get('/about', (req, res) => {
  let forumMessages = [];

  try {
    const data = fs.readFileSync(forumFilePath, 'utf-8');
    forumMessages = data.trim() ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error reading forum.json:', err);
  }

  res.render('pages/about', { forumMessages }); 
});

// router.get('/about', (req, res) => res.render('pages/about'));

const fs = require('fs');

const eventsFilePath = path.join(__dirname, '../events.json');

router.get('/events', (req, res) => {
  fs.readFile(eventsFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error("Error reading events:", err);
      return res.status(500).send("Could not load events");
    }

    let events = [];
    try {
      events = JSON.parse(data);
    } catch (e) {
      console.error("JSON parse error:", e);
    }

    res.render('pages/events', { events });
  });
});




router.get('/contact', (req, res) => res.render('pages/contact'));
router.get('/thankyou', (req, res) => res.render('pages/thankyou'));

module.exports = router;