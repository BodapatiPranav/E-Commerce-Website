// API service - handles all HTTP requests to backend
import axios from 'axios';

// Base URL for backend API (change this to your backend URL)
const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if user is logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  // Sign up a new user
  signup: async (email, password) => {
    const response = await api.post('/auth/signup', { email, password });
    return response.data;
  },

  // Log in existing user
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Product API calls
export const productAPI = {
  // Get all products
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get single product by ID
  getById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};

// Cart API calls
export const cartAPI = {
  // Add item to cart
  addItem: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  },

  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Update cart item quantity
  updateItem: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  },
};

export default api;
