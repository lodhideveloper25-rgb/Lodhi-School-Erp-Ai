const Finance = require('../models/Finance');
const Inventory = require('../models/Inventory');
const Library = require('../models/Library');
const Transport = require('../models/Transport');
const School = require('../models/School');

// --- FINANCE ---
const getFinances = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const finances = await Finance.find({ schoolId: school._id }).sort({ date: -1 });
    res.json(finances);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addFinance = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const data = { ...req.body, schoolId: school._id, recordedBy: req.user._id };
    const finance = await Finance.create(data);
    res.status(201).json(finance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- INVENTORY ---
const getInventory = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const inventory = await Inventory.find({ schoolId: school._id }).sort({ itemName: 1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const addInventory = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const data = { ...req.body, schoolId: school._id };
    const item = await Inventory.create(data);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// --- LIBRARY ---
const getLibrary = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const library = await Library.find({ schoolId: school._id }).sort({ bookTitle: 1 });
    res.json(library);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// --- TRANSPORT ---
const getTransport = async (req, res) => {
  try {
    const school = await School.findOne({ schoolCode: req.user.schoolCode });
    if (!school) return res.status(404).json({ message: 'School not found' });

    const transport = await Transport.find({ schoolId: school._id }).sort({ vehicleNumber: 1 });
    res.json(transport);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { 
  getFinances, addFinance, 
  getInventory, addInventory, 
  getLibrary, 
  getTransport 
};
