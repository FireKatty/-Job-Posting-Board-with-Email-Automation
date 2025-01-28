// const nodemailer = require('nodemailer');

// // Nodemailer Setup
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false, // Use true for port 465
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
// });

// module.exports = transporter;
  

const nodemailer = require('nodemailer');

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
  tls: {
    rejectUnauthorized: false, // Allows self-signed certificates (can be useful for development)
  },
});

// Test the connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with SMTP connection:', error);
  } else {
    console.log('SMTP connection successful');
  }
});

module.exports = transporter;
