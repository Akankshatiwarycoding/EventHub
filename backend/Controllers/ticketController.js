const db = require("../config/db");


exports.purchaseTicket = (req, res) => {
  const { event_id, user_id, ticket_type, quantity, total_price } = req.body;

  db.query(
    "INSERT INTO tickets (event_id, user_id, ticket_type, quantity, total_price) VALUES (?, ?, ?, ?, ?)",
    [event_id, user_id, ticket_type, quantity, total_price],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ success: true, message: "Ticket purchased!" });
    }
  );
};

exports.getUserTickets = (req, res) => {
  const userId = req.params.userId;
  db.query(
    "SELECT * FROM tickets WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    }
  );
};
