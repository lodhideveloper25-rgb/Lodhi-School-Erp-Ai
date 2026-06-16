const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  schoolCode: { type: String, required: true, unique: true },
  principalName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  
  // SaaS Subscription Details
  plan: { 
    type: String, 
    enum: ['Free', 'Basic', 'Premium', 'Enterprise'], 
    default: 'Free' 
  },
  expiryDate: { type: Date },
  status: { 
    type: String, 
    enum: ['Active', 'Suspended', 'Expired'], 
    default: 'Active' 
  },
  
  // Customization
  logo: { type: String },
  address: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('School', schoolSchema);
