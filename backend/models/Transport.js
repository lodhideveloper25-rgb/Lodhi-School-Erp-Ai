const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  vehicleNumber: { type: String, required: true, unique: true },
  vehicleType: { type: String }, // Bus, Van
  driverName: { type: String, required: true },
  driverPhone: { type: String },
  routeName: { type: String, required: true },
  stops: [{ type: String }],
  seatingCapacity: { type: Number },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transport', transportSchema);
