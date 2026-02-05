const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();


const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors()); // allow frontend (React) to talk to this backend
app.use(express.json()); // parse JSON request bodies

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Route files
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Mount routes with prefixes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware (simple version)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke on the server' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

