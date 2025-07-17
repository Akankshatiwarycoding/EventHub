const express = require('express');
const cors = require('cors');
const authRoutes = require('./Routes/authRoute.js');
const eventRoutes = require('./Routes/eventRoute.js');
const organizerRoutes = require("./Routes/organizerRoutes.js");
const ticketRoutes = require("./Routes/ticketRoutes.js");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

app.use('/api/auth', authRoutes);

app.use('/api/events', eventRoutes);
app.use("/api/organizer", organizerRoutes);
app.use("/api/tickets", ticketRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
