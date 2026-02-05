const mongoose = require('mongoose');

// Simple MongoDB connection helper
// ELI10: This function connects our server to the MongoDB database using a URL from .env
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // exit the process if DB connection fails
  }
};

module.exports = connectDB;

