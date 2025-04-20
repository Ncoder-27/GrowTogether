const express = require('express');
const BusinessModel = require('../models/businessModel');
const router = express.Router();

// Create a new business
router.post('/add', (req, res) => {
  console.log(req.body);
  new BusinessModel(req.body).save()
    .then((result) => {
      res.status(201).json({ message: 'Business added', result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// Get all businesses
router.get('/getall', async (req, res) => {
  try {
    const businesses = await BusinessModel.find();
    res.status(200).json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single business by ID
router.get('/getbyid/:id', async (req, res) => {
  try {
    const business = await BusinessModel.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    res.status(200).json(business);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a business by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedBusiness = await BusinessModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBusiness) return res.status(404).json({ message: 'Business not found' });
    res.status(200).json({ message: 'Business updated', business: updatedBusiness });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a business by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedBusiness = await BusinessModel.findByIdAndDelete(req.params.id);
    if (!deletedBusiness) return res.status(404).json({ message: 'Business not found' });
    res.status(200).json({ message: 'Business deleted', business: deletedBusiness });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
