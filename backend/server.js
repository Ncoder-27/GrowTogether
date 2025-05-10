const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Routes
const authRouter = require('./routers/authRouter');
const businessRouter = require('./routers/businessRouter');
const partnerRouter = require('./routers/partnerRouter');
const chatRouter = require('./routers/chatRouter');

dotenv.config();
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store online users
const onlineUsers = new Map();

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle user online status
  socket.on('user_online', (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit('user_status_change', { userId, status: 'online' });
    console.log(`User ${userId} is online`);
  });

  // Join a chat room
  socket.on('join_chat', (data) => {
    const roomId = [data.userId, data.contactId].sort().join('_');
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);
  });

  // Leave a chat room
  socket.on('leave_chat', (data) => {
    const roomId = [data.userId, data.contactId].sort().join('_');
    socket.leave(roomId);
    console.log(`User ${socket.id} left room: ${roomId}`);
  });

  // Handle new messages
  socket.on('send_message', async (data) => {
    try {
      // Save message to database first
      const chat = new Chat(data);
      const savedMessage = await chat.save();
      
      // Populate sender and receiver details
      const populatedMessage = await Chat.findById(savedMessage._id)
        .populate('sender', 'businessName fullName')
        .populate('receiver', 'businessName fullName');

      const roomId = [data.sender, data.receiver].sort().join('_');
      
      // Emit to the room with populated message data
      io.to(roomId).emit('receive_message', populatedMessage);
      
      // Emit typing status to the room
      io.to(roomId).emit('stop_typing', { userId: data.sender });

      // Update contacts for both users
      const senderContacts = await Chat.find({
        $or: [
          { sender: data.sender },
          { receiver: data.sender }
        ]
      }).sort({ timestamp: -1 });

      const receiverContacts = await Chat.find({
        $or: [
          { sender: data.receiver },
          { receiver: data.receiver }
        ]
      }).sort({ timestamp: -1 });

      // Emit contact updates to both users
      io.to(data.sender).emit('contacts_update', senderContacts);
      io.to(data.receiver).emit('contacts_update', receiverContacts);
    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit('message_error', { error: 'Failed to send message' });
    }
  });

  // Handle typing status
  socket.on('typing', (data) => {
    const roomId = [data.userId, data.contactId].sort().join('_');
    socket.to(roomId).emit('typing', { userId: data.userId });
  });

  // Handle stop typing
  socket.on('stop_typing', (data) => {
    const roomId = [data.userId, data.contactId].sort().join('_');
    socket.to(roomId).emit('stop_typing', { userId: data.userId });
  });

  // Handle message read status
  socket.on('message_read', (data) => {
    const roomId = [data.userId, data.contactId].sort().join('_');
    io.to(roomId).emit('messages_read', { userId: data.userId });
  });

  socket.on('disconnect', () => {
    // Find and remove the user from online users
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        io.emit('user_status_change', { userId, status: 'offline' });
        console.log(`User ${userId} is offline`);
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/business', businessRouter);
app.use('/partner', partnerRouter);
app.use('/chat', chatRouter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 