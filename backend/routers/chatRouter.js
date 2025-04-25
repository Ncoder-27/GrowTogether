const express = require('express');
const Chat = require('../models/chatModel'); // Import the Chat model
const router = express.Router();

// Create a new chat message
router.post('/add', async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    res.status(201).json({ message: 'Chat message added successfully', data: savedChat });
  } catch (error) {
    res.status(500).json({ message: 'Error adding chat message', error });
  }
});

// Get all chat messages
router.get('/all', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.status(200).json({ message: 'Chat messages retrieved successfully', data: chats });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat messages', error });
  }
});

// Get a single chat message by ID
router.get('/:id', async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Chat message retrieved successfully', data: chat });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chat message', error });
  }
});

// Update a chat message by ID
router.put('/update/:id', async (req, res) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Chat message updated successfully', data: updatedChat });
  } catch (error) {
    res.status(500).json({ message: 'Error updating chat message', error });
  }
});

// Delete a chat message by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedChat = await Chat.findByIdAndDelete(req.params.id);
    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat message not found' });
    }
    res.status(200).json({ message: 'Chat message deleted successfully', data: deletedChat });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting chat message', error });
  }
});

module.exports = router;