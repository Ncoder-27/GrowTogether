const express = require('express');
const router = express.Router();
const PartnerModel = require('../models/partnerModel');

// Create new partner
router.post('/add', async (req, res) => {
  try {
    const partner = new PartnerModel(req.body);
    await partner.save();
    res.status(201).json({ message: 'Partner added', partner });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all partners
router.get('/', async (req, res) => {
  try {
    const partners = await PartnerModel.find();
    res.status(200).json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single partner by ID
router.get('/:id', async (req, res) => {
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json(partner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update partner by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await PartnerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json({ message: 'Partner updated', partner: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete partner by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await PartnerModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json({ message: 'Partner deleted', partner: deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
