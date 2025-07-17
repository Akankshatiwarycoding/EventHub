const express = require("express");
const router = express.Router();
const { purchaseTicket, getUserTickets } = require("../controllers/ticketController");

router.post("/purchase", purchaseTicket);
router.get("/user/:userId", getUserTickets);

module.exports = router;
