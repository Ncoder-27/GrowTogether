const { Schema, model } = require('../connection');

const FeedbackSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = model('Feedback', FeedbackSchema);
