const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const PORT = 5001;
const attendanceRoute = require('./routes/attendance/punch');
const path = require('path');
const userRoutes = require('../backendserver/routes/Hr/UserRoutes');
const leaveRoutes = require("./routes/Hr/leaveRoutes");
const notificationsRoute = require('./routes/Notifications');
const contactpage = require('./routes/ContactRoutes')
const careersRoutes = require("./routes/Hr/careers");

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
const db = require('./db/db');

// Routes
app.get("/", (req, res) => res.send("🎉 Backend is working!"));
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/leaves'));
app.use('/api', attendanceRoute);
app.use('/api/punch', require('./routes/attendance/punch'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require('./routes/profile'));
app.use('/api/hr/users', userRoutes);
app.use("/api/hr-leaves", leaveRoutes);
app.use('/api', notificationsRoute);
app.use('/api/contact-us', contactpage);
app.use("/api/careers", careersRoutes);




// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
