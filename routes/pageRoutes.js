// routes/pageRoutes.js

const express = require("express");
const router = express.Router();
const events = require("../events.json");

// Helper to parse date from the event's time string
function parseDate(str) {
  const datePart = str.split("From")[0].trim();
  const cleaned = datePart.replace("h", ":").replace(/[^0-9/: ]/g, "");
  return new Date(cleaned);
}

router.get("/", (req, res) => {
  // Sort events by date descending and get latest 3
  const sorted = events.sort((a, b) => parseDate(b.time) - parseDate(a.time));
  const latestThree = sorted.slice(0, 3);

  res.render("pages/home", { events: latestThree });
});

router.get("/about", (req, res) => res.render("pages/about"));
router.get("/events", (req, res) => res.render("pages/events"));
router.get("/contact", (req, res) => res.render("pages/contact"));
router.get("/thankyou", (req, res) => res.render("pages/thankyou"));

module.exports = router;
