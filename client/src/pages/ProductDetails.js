// ProductDetails Page - shows full product information
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch product from API
  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productAPI.getById(id);
      setProduct(data.product);
      setError(null);
    } catch (err) {
      setError('Product not found');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch product details on component mount
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }
    setAdding(true);
    const result = await addToCart(product._id, quantity);
    if (result.success) {
      alert('Item added to cart!');
    } else {
      alert(result.error || 'Failed to add item');
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="product-details-page">
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="error">{error || 'Product not found'}</div>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        
        <div className="product-details-content">
          <div className="product-image-section">
            <img
              src={product.image || '/placeholder-image.jpg'}
              alt={product.name}
              className="product-detail-image"
            />
          </div>
          
          <div className="product-info-section">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="quantity-input"
              />
            </div>
            
            <button
              onClick={handleAddToCart}
              className="add-to-cart-detail-btn"
              disabled={adding}
            >
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
