const express = require('express');
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const cors = require('cors');

const app = express();
app.use(cors()); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder to serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static HTML upload page from /views
app.use('/upload', express.static(path.join(__dirname, 'views')));

// Routes
app.use('/', uploadRoutes);

// Fallback
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

module.exports = app;
