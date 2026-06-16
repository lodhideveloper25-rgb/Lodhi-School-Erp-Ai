const mongoose = require('mongoose');

const genericDataSchema = new mongoose.Schema({
  schoolCode: {
    type: String,
    required: true,
    index: true
  },
  moduleName: {
    type: String,
    required: true,
    index: true // Indexing for faster queries since all modules share this collection
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'Active'
  },
  // Allows any additional fields to be saved if a specific module needs them later
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true,
  strict: false // Allows dynamic fields at the root level if necessary
});

module.exports = mongoose.model('GenericData', genericDataSchema);
