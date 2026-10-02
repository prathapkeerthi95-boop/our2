const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running smoothly on port 5001' });
});

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'keerthiprathap19@gmail.com',
    pass: 'YOUR_APP_PASSWORD_HERE' // You will need to generate a Google App Password
  }
});

// Order submission endpoint
app.post('/api/order', async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  console.log(`\n=== New Order Received! ===`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Phone: ${phone}`);
  console.log(`Message: ${message}`);
  console.log(`===========================\n`);
  
  const mailOptions = {
    from: 'keerthiprathap19@gmail.com',
    to: 'keerthiprathap19@gmail.com',
    subject: `New Project Brief from ${name}`,
    text: `You have received a new project brief.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      success: true, 
      message: 'Thank you for your order! Our team will contact you shortly to start your project.' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending email.' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
