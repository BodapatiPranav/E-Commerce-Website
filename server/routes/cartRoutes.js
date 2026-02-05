const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Helper: get or create cart for a user
const getUserCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate('items.product');
  }
  return cart;
};

// @route   GET /api/cart
// @desc    Get logged-in user's cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const cart = await getUserCart(req.user._id);
    res.json({ cart });
  } catch (error) {
    console.error('Get cart error:', error.message);
    res.status(500).json({ message: 'Server error fetching cart' });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart or update quantity
// body: { productId, quantity } (quantity default 1)
// @access  Private
router.post('/', protect, async (req, res) => {
  const { productId } = req.body;
  let quantity = Number(req.body.quantity) || 1;

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: 'Valid quantity is required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getUserCart(req.user._id);

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Increment quantity for existing item
      cart.items[existingItemIndex].quantity =
        Number(cart.items[existingItemIndex].quantity) + quantity;
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    const updatedCart = await getUserCart(req.user._id);

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error('Add/update cart item error:', error.message);
    res.status(500).json({ message: 'Server error updating cart' });
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity by cart item id
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const itemId = req.params.id;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'Valid quantity is required' });
  }

  try {
    const cart = await getUserCart(req.user._id);
    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    item.quantity = quantity;
    await cart.save();
    const updatedCart = await getUserCart(req.user._id);

    res.json({ cart: updatedCart });
  } catch (error) {
    console.error('Update cart item error:', error.message);
    res.status(500).json({ message: 'Server error updating cart item' });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart by cart item id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  const itemId = req.params.id;

  try {
    const cart = await getUserCart(req.user._id);
    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Use pull() to remove the subdocument instead of deprecated remove()
    cart.items.pull(itemId);
    await cart.save();
    const updatedCart = await getUserCart(req.user._id);

    res.json({ cart: updatedCart });
  } catch (error) {
    console.error('Remove cart item error:', error.message);
    res.status(500).json({ message: 'Server error removing item from cart' });
  }
});

module.exports = router;

