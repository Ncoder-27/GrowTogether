const express = require('express');
const ContactUs = require('../models/contactusModel'); // Import the ContactUs model
const router = express.Router();

// Create a new contact message
router.post('/add', async (req, res) => {
  try {
    const contactMessage = new ContactUs(req.body);
    const savedMessage = await contactMessage.save();
    res.status(201).json({ message: 'Contact message added successfully', data: savedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error adding contact message', error });
  }
});

// Get all contact messages
router.get('/all', async (req, res) => {
  try {
    const messages = await ContactUs.find();
    res.status(200).json({ message: 'Contact messages retrieved successfully', data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact messages', error });
  }
});

// Get a single contact message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await ContactUs.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json({ message: 'Contact message retrieved successfully', data: message });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contact message', error });
  }
});

// Update a contact message by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedMessage = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json({ message: 'Contact message updated successfully', data: updatedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact message', error });
  }
});

// Delete a contact message by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedMessage = await ContactUs.findByIdAndDelete(req.params.id);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    res.status(200).json({ message: 'Contact message deleted successfully', data: deletedMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact message', error });
  }
});

module.exports = router;