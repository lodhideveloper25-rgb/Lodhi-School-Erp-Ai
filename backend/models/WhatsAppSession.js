const mongoose = require('mongoose');

const whatsappSessionSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, unique: true },
  status: { type: String, enum: ['DISCONNECTED', 'QR_READY', 'AUTHENTICATED', 'CONNECTED'], default: 'DISCONNECTED' },
  qrCode: { type: String }, // Store the latest QR code data URL
  phoneNumber: { type: String }, // The connected phone number
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WhatsAppSession', whatsappSessionSchema);
