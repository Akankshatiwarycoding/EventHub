const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all events by organizer
router.get("/events/:organizerId", (req, res) => {
  const { organizerId } = req.params;
  const query = "SELECT * FROM events WHERE organizer_id = ?";
  db.query(query, [organizerId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Delete an event
router.delete("/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  db.query("DELETE FROM events WHERE id = ?", [eventId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Event deleted successfully" });
  });
});

// Update an event
router.put("/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  const { name, description, date, location } = req.body;
  const query =
    "UPDATE events SET name = ?, description = ?, date = ?, location = ? WHERE id = ?";
  db.query(query, [name, description, date, location, eventId], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Event updated successfully" });
  });
});

// Get attendees for an event
router.get("/events/:eventId/attendees", (req, res) => {
  const { eventId } = req.params;
  const query = `
    SELECT users.name, users.email, tickets.ticket_id
    FROM tickets
    JOIN users ON tickets.user_id = users.id
    WHERE tickets.event_id = ?`;
  db.query(query, [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
