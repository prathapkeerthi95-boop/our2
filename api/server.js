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

// Order submission endpoint
app.post('/api/order', (req, res) => {
  const { name, email, service, message } = req.body;
  
  console.log(`\n=== New Order Received! ===`);
  console.log(`Name: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Service: ${service}`);
  console.log(`Message: ${message}`);
  console.log(`===========================\n`);
  
  res.status(200).json({ 
    success: true, 
    message: 'Thank you for your order! Our team will contact you shortly to start your project.' 
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
