const express = require('express');
const router = express.Router();
const { getFinances, addFinance, getInventory, addInventory, getLibrary, getTransport } = require('../controllers/operationsController');
const { protect, authorize } = require('../middleware/auth');

// Finance Routes
router.route('/finance')
  .get(protect, authorize('admin', 'superadmin', 'principal', 'accountant'), getFinances)
  .post(protect, authorize('admin', 'superadmin', 'accountant'), addFinance);

// Inventory Routes
router.route('/inventory')
  .get(protect, authorize('admin', 'superadmin', 'principal'), getInventory)
  .post(protect, authorize('admin', 'superadmin'), addInventory);

// Library Routes
router.route('/library')
  .get(protect, getLibrary); // Everyone can view library

// Transport Routes
router.route('/transport')
  .get(protect, getTransport); // Everyone can view routes

module.exports = router;
