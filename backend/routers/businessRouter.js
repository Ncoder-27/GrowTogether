const express = require('express');
const BusinessModel = require('../models/businessModel');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
const sendEmail = require('../utils');

// Create a new business
router.post('/add', async (req, res) => {
  try {
    const business = new BusinessModel(req.body);
    await business.save();
    res.status(201).json({ message: 'Business registered successfully', business });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Protected routes
// router.use(verifyToken);

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
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.status(200).json({ message: 'Business retrieved successfully', data: business });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a business by ID
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    
    console.log('Updating business:', id, updatedData);
    
    const business = await BusinessModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.status(200).json({
      message: 'Business updated successfully',
      data: business
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message });
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
                userType: 'business'
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

// Connect with business endpoint
router.post('/connect', async (req, res) => {
  try {
    const { businessId, partnerName, partnerEmail, message } = req.body;
    const business = await BusinessModel.findById(businessId);
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    const emailSubject = 'New Connection Request on GrowTogether';
    const emailMessage = `
Dear ${business.fullName},

You have received a new connection request from ${partnerName}.

Partner Details:
- Name: ${partnerName}
- Email: ${partnerEmail}

Message from partner:
${message}

You can reply directly to this email to get in touch with the partner.

Best regards,
GrowTogether Team
    `;

    await sendEmail(business.email, emailSubject, emailMessage);
    res.status(200).json({ message: 'Connection request sent successfully' });
  } catch (err) {
    console.error('Error sending connection request:', err);
    res.status(500).json({ error: 'Failed to send connection request' });
  }
});

module.exports = router;
