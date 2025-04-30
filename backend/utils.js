// emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use SMTP settings for better control
  auth: {
    user: 'growtogether2640@gmail.com',    // your Gmail address
    pass: 'gbir tytn mjxv ipyq',
        // your Gmail app password
  },
});

/**
 * Send an email using Nodemailer
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} message - Plain text message body
 */
const sendEmail = async (to, subject, message) => {
  try {
    const mailOptions = {
      from: 'growtogether2640@gmail.com',
      to,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
