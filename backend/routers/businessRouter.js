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
  console.log(req.body);
  
  try {
    const result = await BusinessModel.findOne({ email: req.body.email });
    if (result) {
      if (result.password === req.body.password) {
        const { _id, fullName, email } = result;
        console.log(result);
        
        const payload = { _id, fullName, email, role: 'business' };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: '1d' },
          (err, token) => {
            if (err) {
              res.status(500).json({ error: err.message });
            } else {
              // Include _id in the response
              res.status(200).json({ token, _id });
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
