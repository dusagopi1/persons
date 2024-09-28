const mongoose = require('mongoose');

// Define schema for person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // This ensures the name must be entered
  },
  age: {
    type: Number
  },
  work: {
    type: String,
    enum :['student','teacher','warden'],
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  salary: {
    type: Number
  }
});

const Person = mongoose.model('persons', personSchema);
module.exports = Person;
