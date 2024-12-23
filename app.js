const express = require('express');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/students', studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
