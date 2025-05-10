const express = require('express');
const router = express.Router();
const PartnerModel = require('../models/partnerModel');
const jwt = require('jsonwebtoken');

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
router.get('/getall', async (req, res) => {
  try {
    const partners = await PartnerModel.find();
    res.status(200).json({ message: 'Partners retrieved successfully', data: partners });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single partner by ID
router.get('/getbyid/:id', async (req, res) => {  // Fixed missing forward slash
  try {
    const partner = await PartnerModel.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.status(200).json({ message: 'Partner retrieved successfully', data: partner });  // Added consistent response format
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update partner by ID
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    
    console.log('Updating partner:', id, updatedData);
    
    const partner = await PartnerModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!partner) {
      return res.status(404).json({ message: 'Partner not found' });
    }

    res.status(200).json({
      message: 'Partner updated successfully',
      data: partner
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
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

router.post('/authentication', async (req, res) => {
  try {
    const result = await PartnerModel.findOne({ email: req.body.email });
    if (result) {
      if (result.password === req.body.password) {
        const payload = {
          _id: result._id,
          fullName: result.fullName, // Use fullName from the database
          email: result.email
        };

        console.log('Creating token with payload:', payload); // Debug log
        
        jwt.sign(
          payload,
          process.env.JWT_SECRET || 'your-secret-key',
          { expiresIn: '1d' },
          (err, token) => {
            if (err) {
              console.error('JWT Sign Error:', err);
              res.status(500).json({ error: err.message });
            } else {
              res.status(200).json({
                message: 'Login successful',
                token,
                _id: result._id,
                fullName: result.fullName,
                email: result.email,
                userType: 'partner'
              });
            }
          }
        );
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Authentication Error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
