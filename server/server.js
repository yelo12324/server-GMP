const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

// 🔧 Allow React frontend on port 5173 and 5174
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://gunno-media-production-wxet.vercel.app/', 'https://gunnomediaproductions.com'] 
}));

app.use(bodyParser.json());

// ✅ Root check route
app.get('/', (req, res) => {
  res.send('Email server is up and running!');
});

// 🔐 Gmail transporter using App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gunnomediaproductions@gmail.com',
    pass: 'onkp kane kopl tfnx', // ⚠️ App Password (keep secure)
  },
});

// 📬 Handle contact form submission
app.post('/send-email', (req, res) => {
  const { name, contact, query, message } = req.body;

  const mailOptions = {
    from: 'gunnomediaproductions@gmail.com',
    to: 'gunnomediaproductions@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h3>New Message Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Interested In:</strong> ${query}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('✅ Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});


// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
