// Seed script to add sample products to database
// Run with: node scripts/seedProducts.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load environment variables
dotenv.config();

// Sample products data
const sampleProducts = [
  {
    name: 'Wireless Mouse',
    price: 29.99,
    description: 'Ergonomic wireless mouse with precision tracking. Perfect for work and gaming.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
  },
  {
    name: 'Mechanical Keyboard',
    price: 89.99,
    description: 'RGB mechanical keyboard with cherry MX switches. Great for typing and gaming.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
  },
  {
    name: 'USB-C Hub',
    price: 49.99,
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    image: 'https://plus.unsplash.com/premium_photo-1761043248662-42f371ad31b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8VVNCLUMlMjBodWJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Wireless Headphones',
    price: 79.99,
    description: 'Noise-cancelling wireless headphones with 30-hour battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  },
  {
    name: 'Laptop Stand',
    price: 39.99,
    description: 'Adjustable aluminum laptop stand for better ergonomics.',
    image: 'https://images.unsplash.com/photo-1629317480826-910f729d1709?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wJTIwc3RhbmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Webcam HD',
    price: 59.99,
    description: '1080p HD webcam with built-in microphone for video calls.',
    image: 'https://images.unsplash.com/photo-1614588876378-b2ffa4520c22?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2ViY2FtJTIwaGR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'USB Flash Drive 64GB',
    price: 19.99,
    description: 'High-speed USB 3.0 flash drive with 64GB storage capacity.',
    image: 'https://plus.unsplash.com/premium_photo-1726768935831-b4541df89d85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNiJTIwZmxhc2hkcml2ZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Monitor Stand',
    price: 34.99,
    description: 'Dual monitor stand with adjustable height and tilt.',
    image: 'https://plus.unsplash.com/premium_photo-1683326528070-4ebec9188ae1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9uaXRvciUyMHN0YW5kfGVufDB8fDB8fHww',
  },
];

// Connect to MongoDB and seed products
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Clear existing products (optional - remove if you want to keep existing)
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
