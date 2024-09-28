const mongoose = require('mongoose');

// MongoDB connection string
const mongoUrl = 'mongodb+srv://dusagopi1:dusagopi1@cluster0.cjpnc.mongodb.net/studDetails';

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
