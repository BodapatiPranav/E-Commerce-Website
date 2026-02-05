const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products (with optional search by name)
// @access  Public
router.get('/', async (req, res) => {
  const searchQuery = req.query.search || '';

  try {
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: 'i' } } // case-insensitive search
      : {};

    const products = await Product.find(filter);
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error.message);
    res.status(500).json({ message: 'Server error fetching products' });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Get product by id error:', error.message);
    res.status(500).json({ message: 'Server error fetching product' });
  }
});

module.exports = router;

