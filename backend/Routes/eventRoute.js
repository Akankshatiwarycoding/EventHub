const express = require("express");
const router = express.Router();
const { createEvent, searchEvents } = require("../Controllers/eventController.js");
const verifyToken = require("../Middleware/VerifyToken.js");

router.post("/create", verifyToken, createEvent);
router.get("/search", searchEvents);
module.exports = router;
