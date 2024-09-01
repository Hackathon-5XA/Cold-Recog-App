const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services as well
  auth: {
    user: 'fivexa69@gmail.com', // Replace with your email
    pass: process.env.EMAIL_PASSWORD  // Replace with your email password or an App Password
  }
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'fivexa69@gmail.com', // Replace with your email
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
