const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  bookTitle: { type: String, required: true },
  author: { type: String },
  isbn: { type: String },
  category: { type: String },
  totalCopies: { type: Number, required: true, default: 1 },
  availableCopies: { type: Number, required: true, default: 1 },
  rackNumber: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Library', librarySchema);
