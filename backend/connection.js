require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
    .then((result) => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

module.exports = mongoose;