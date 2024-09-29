const mongoose = require('mongoose');
require('dotenv).config();
// MongoDB connection string
const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  // Removed deprecated options
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Database connection established');
});

db.on('disconnected', () => {
  console.log('Database connection disconnected');
});

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Database connection closed due to app termination');
    process.exit(0);
  });
});

module.exports = db;
