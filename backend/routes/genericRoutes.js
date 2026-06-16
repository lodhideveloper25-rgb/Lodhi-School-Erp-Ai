const express = require('express');
const router = express.Router();
const GenericData = require('../models/GenericData');
const { protect } = require('../middleware/authMiddleware');

// Get all records for a specific module (Multi-Tenant Isolated)
router.get('/:moduleName', protect, async (req, res) => {
  try {
    const query = { 
      moduleName: req.params.moduleName,
      schoolCode: req.user.schoolCode // STRICT TENANT ISOLATION
    };
    
    // Super admins might need to see all, but for now we enforce strict isolation
    // If we want superadmin to bypass: if (req.user.role === 'superadmin') delete query.schoolCode;
    // But even superadmin should be scoped to the school they are currently viewing.
    
    const data = await GenericData.find(query).sort('-createdAt');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching module data', error: error.message });
  }
});

// Create a new record for a specific module
router.post('/:moduleName', protect, async (req, res) => {
  try {
    const { title, description, status, ...otherFields } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const newData = await GenericData.create({
      schoolCode: req.user.schoolCode, // INJECT TENANT ID
      moduleName: req.params.moduleName,
      title,
      description,
      status: status || 'Active',
      metadata: otherFields
    });

    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error creating module data', error: error.message });
  }
});

// Update a record
router.put('/:id', protect, async (req, res) => {
  try {
    // Ensure the record belongs to this school
    const record = await GenericData.findOne({ _id: req.params.id, schoolCode: req.user.schoolCode });
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found or unauthorized' });
    }

    const updatedData = await GenericData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating module data', error: error.message });
  }
});

// Delete a record
router.delete('/:id', protect, async (req, res) => {
  try {
    // Ensure the record belongs to this school before deleting
    const record = await GenericData.findOne({ _id: req.params.id, schoolCode: req.user.schoolCode });
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found or unauthorized' });
    }

    await GenericData.findByIdAndDelete(req.params.id);
    res.json({ message: 'Record removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error deleting module data', error: error.message });
  }
});

module.exports = router;
