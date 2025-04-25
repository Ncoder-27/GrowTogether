const express = require('express');
const Feedback = require('../models/feedbackModel'); // Import the Feedback model
const router = express.Router();

// Create a new feedback
router.post('/add', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    const savedFeedback = await feedback.save();
    res.status(201).json({ message: 'Feedback added successfully', data: savedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error });
  }
});

// Get all feedback
router.get('/all', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json({ message: 'Feedback retrieved successfully', data: feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error });
  }
});

// Get a single feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback retrieved successfully', data: feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving feedback', error });
  }
});

// Update feedback by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback updated successfully', data: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error });
  }
});

// Delete feedback by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully', data: deletedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
});

module.exports = router;