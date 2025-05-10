const { Schema, model } = require('../connection');

const ChatSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,  // Changed to ObjectId reference
    required: true,
    refPath: 'senderType'
  },
  receiver: {
    type: Schema.Types.ObjectId,  // Changed to ObjectId reference
    required: true,
    refPath: 'receiverType'
  },
  senderType: {
    type: String,
    required: true,
    enum: ['Business', 'Partner']
  },
  receiverType: {
    type: String,
    required: true,
    enum: ['Business', 'Partner']
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create an index for faster querying of conversations
ChatSchema.index({ sender: 1, receiver: 1 });

module.exports = model('Chat', ChatSchema);