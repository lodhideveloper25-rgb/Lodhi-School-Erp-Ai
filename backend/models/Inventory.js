const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  itemName: { type: String, required: true },
  category: { type: String }, // e.g., Stationery, Electronics, Furniture
  quantity: { type: Number, required: true, default: 0 },
  unitPrice: { type: Number },
  vendorName: { type: String },
  lowStockAlert: { type: Number, default: 5 },
  lastRestocked: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
