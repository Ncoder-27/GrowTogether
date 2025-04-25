const { Schema, model } = require('../connection');

const ContactusSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
});

module.exports = model('Contactus', ContactusSchema);
