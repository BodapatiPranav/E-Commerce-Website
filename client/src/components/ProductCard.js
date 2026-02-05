// ProductCard Component - displays product info in a card format
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    setAdding(true);
    const result = await addToCart(product._id, 1);
    if (result.success) {
      alert('Item added to cart!');
    } else {
      alert(result.error || 'Failed to add item');
    }
    setAdding(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`} className="product-link">
        <div className="product-image-container">
          {imageError ? (
            <div className="product-image-placeholder">
              <span>{product.name}</span>
            </div>
          ) : (
            <img
              src={product.image || '/placeholder-image.jpg'}
              alt={product.name}
              className="product-image"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        className="add-to-cart-btn"
        disabled={adding}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
