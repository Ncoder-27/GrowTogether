const express = require('express');
const Chat = require('../models/chatModel');
const Business = require('../models/businessModel');
const Partner = require('../models/partnerModel');
const router = express.Router();

// Create message
// POST /chat/add
router.post('/add', async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    
    // Validate user types
    const senderModel = req.body.senderType === 'Business' ? Business : Partner;
    const receiverModel = req.body.receiverType === 'Business' ? Business : Partner;

    const senderExists = await senderModel.findById(sender);
    const receiverExists = await receiverModel.findById(receiver);

    if (!senderExists || !receiverExists) {
      return res.status(400).json({ message: 'Invalid sender or receiver' });
    }

    const chat = new Chat(req.body);
    const savedChat = await chat.save();
    res.status(201).json({ message: 'Message sent successfully', data: savedChat });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// GET /chat/messages/:userId/:contactId
router.get('/messages/:userId/:contactId', async (req, res) => {
  try {
    const messages = await Chat.find({
      $or: [
        { sender: req.params.userId, receiver: req.params.contactId },
        { sender: req.params.contactId, receiver: req.params.userId }
      ]
    })
    .populate('sender', 'businessName fullName')
    .populate('receiver', 'businessName fullName')
    .sort({ timestamp: 1 });

    // Mark messages as read
    await Chat.updateMany(
      {
        sender: req.params.contactId,
        receiver: req.params.userId,
        read: false
      },
      { $set: { read: true } }
    );

    res.status(200).json({ message: 'Messages retrieved', data: messages });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
});

// Get contacts with last message and unread count
// GET /chat/contacts/:userId
// GET /contacts/:userId
router.get('/contacts/:userId', async (req, res) => {
  try {
    // Get all messages for the user
    const messages = await Chat.find({
      $or: [
        { sender: req.params.userId },
        { receiver: req.params.userId }
      ]
    }).sort({ timestamp: -1 });

    // Create a Map to store unique contacts with their latest message
    const contactMap = new Map();

    // Process messages to get unique contacts
    for (const message of messages) {
      const contactId = message.sender.toString() === req.params.userId 
        ? message.receiver.toString() 
        : message.sender.toString();

      // Skip if we already have this contact with a newer message
      if (contactMap.has(contactId)) continue;

      // Get contact info
      let contact = await Business.findById(contactId);
      let type = 'business';
      
      if (!contact) {
        contact = await Partner.findById(contactId);
        type = 'partner';
      }

      if (!contact) continue;

      // Get unread count
      const unread = await Chat.countDocuments({
        sender: contactId,
        receiver: req.params.userId,
        read: false
      });

      // Add to contact map
      contactMap.set(contactId, {
        id: contactId,
        name: type === 'business' ? contact.businessName : contact.fullName,
        type,
        lastMessage: message.message,
        lastMessageTime: message.timestamp,
        unread,
        lastMessageSender: message.sender.toString() === req.params.userId ? 'me' : 'them'
      });
    }

    // Convert map to array and sort by last message time
    const contacts = Array.from(contactMap.values())
      .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    res.status(200).json({ data: contacts });
  } catch (error) {
    console.error('Error in contacts endpoint:', error);
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});
// Other endpoints (unread count, mark as read, delete) remain the same as previous
// Get unread message count for a user
router.get('/unread/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const unreadCount = await Chat.countDocuments({
      receiver: userId,
      read: false
    });
    
    res.status(200).json({ message: 'Unread count retrieved successfully', data: { unreadCount } });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving unread count', error });
  }
});


router.get('getall', (req, res) => {
  Chat.find()
  .then((result) => {
    res.status(200).json({
      message: 'All messages retrieved successfully',
      data: result
    });
  }).catch((err) => {
    res.status(500).json({
      message: 'Error retrieving messages',
      error: err
    });
  });
})

// Mark messages as read
router.put('/read/:senderId/:receiverId', async (req, res) => {
  const { senderId, receiverId } = req.params;
  
  try {
    await Chat.updateMany(
      { sender: senderId, receiver: receiverId, read: false },
      { $set: { read: true } }
    );
    
    res.status(200).json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking messages as read', error });
  }
});

// Delete a chat message
router.delete('/delete/:messageId', async (req, res) => {
  try {
    const deletedMessage = await Chat.findByIdAndDelete(req.params.messageId);
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting message', error });
  }
});

// Delete all messages between two users (delete contact)
router.delete('/contact/:userId/:contactId', async (req, res) => {
  try {
    const { userId, contactId } = req.params;
    
    // Delete all messages between the two users
    await Chat.deleteMany({
      $or: [
        { sender: userId, receiver: contactId },
        { sender: contactId, receiver: userId }
      ]
    });
    
    res.status(200).json({ message: 'Contact and all messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact', error });
  }
});

module.exports = router;