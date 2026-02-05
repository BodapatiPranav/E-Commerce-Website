// Cart Page - displays user's shopping cart
import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } =
    useCart();
  const { isAuthenticated } = useAuth();

  // Fetch cart when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      // Cart is automatically fetched by CartContext
    }
  }, [isAuthenticated]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId);
    } else {
      await updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemove = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      await removeFromCart(itemId);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <h2>Please login to view your cart</h2>
            <Link to="/login" className="login-link">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Your Cart</h1>
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={item.product.image || '/placeholder-image.jpg'}
                    alt={item.product.name}
                  />
                </div>
                
                <div className="cart-item-info">
                  <Link
                    to={`/product/${item.product._id}`}
                    className="cart-item-name"
                  >
                    {item.product.name}
                  </Link>
                  <p className="cart-item-price">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="cart-item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-total">
                  <p className="item-total-price">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                
                <button
                  onClick={() => handleRemove(item._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="summary-total">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="checkout-btn" disabled>
              Checkout (Coming Soon)
            </button>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
