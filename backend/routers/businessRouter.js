const express = require('express');
const BusinessModel = require('../models/businessModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');

// Create a new business
router.post('/add', verifyToken, async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if business already exists
    // const existingBusiness = await BusinessModel.findOne({ email: req.body.email });
    // if (existingBusiness) {
    //   return res.status(400).json({ message: 'Business already registered' });
    // }

    const business = new BusinessModel(req.body);
    await business.save();
    res.status(201).json({ message: 'Business registered successfully', business });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Protected routes
router.use(verifyToken);

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

router.post('/authentication', async (req, res) => {
  try {
    const result = await BusinessModel.findOne({ email: req.body.email });
    if (result) {
      if (result.password === req.body.password) {
        const { _id, fullName, email } = result;
        const payload = { _id, fullName, email, role: 'business' };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
          (err, token) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              res.status(200).json({ token });
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
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
