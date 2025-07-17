const db = require("../config/db");

// Create Event Controller
exports.createEvent = (req, res) => {
  const { title, description, date, time, location, ticket_price, privacy, category } = req.body;
  const userId = req.user.id;

  if (!title || !date || !time || !location) {
    return res.status(400).json({ error: "Title, date, time, and location are required" });
  }

  const query = `
    INSERT INTO events 
    (user_id, title, description, date, time, location, ticket_price, privacy, category) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [userId, title, description, date, time, location, ticket_price, privacy, category],
    (err, result) => {
      if (err) {
        console.error("Create event failed:", err);
        return res.status(500).json({ error: "Failed to create event", err });
      }
      res.status(201).json({ message: "Event created successfully", eventId: result.insertId });
    }
  );
};

// Search Events Controller
exports.searchEvents = (req, res) => {
  const { keyword, category, location, date } = req.query;

  let sql = "SELECT * FROM events WHERE 1=1";
  const params = [];

  if (keyword) {
    sql += " AND (title LIKE ? OR description LIKE ?)";
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

  if (location) {
    sql += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  if (date) {
    sql += " AND DATE(date) = ?";
    params.push(date);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Search query failed:", err);
      return res.status(500).json({ error: "Error searching events", err });
    }
    res.status(200).json(results);
  });
};