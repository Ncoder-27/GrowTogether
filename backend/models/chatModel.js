const { Schema, model } = require('../connection');
const ChatSchema = new Schema({

    message: { type: String, required: true },
});

module.exports = model('Chat', ChatSchema);
