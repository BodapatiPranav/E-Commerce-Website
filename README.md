# E-Commerce Website (Full Stack)

A complete, interview-ready full-stack e-commerce application built with React, Node.js, Express, and MongoDB. This project demonstrates modern web development practices including JWT authentication, RESTful APIs, and responsive design.

## 🎯 Project Overview

This is a full-featured e-commerce platform where users can browse products, add items to their cart, and manage their shopping experience. The application features a clean, modern UI with a robust backend API.

## ✨ Features

### Frontend Features
- **Home Page**: Browse all products with search functionality
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add, update, and remove items with quantity management
- **User Authentication**: Secure signup and login with JWT tokens
- **Protected Routes**: Cart and checkout pages require authentication
- **Responsive Design**: Mobile-friendly interface that works on all devices

### Backend Features
- **RESTful API**: Clean, well-structured API endpoints
- **JWT Authentication**: Secure token-based authentication system
- **Password Hashing**: Bcrypt encryption for user passwords
- **MongoDB Integration**: Mongoose ODM for database operations
- **Protected Routes**: Middleware to protect sensitive endpoints
- **Error Handling**: Comprehensive error handling and validation

## 🛠️ Tech Stack

### Frontend
- **React** (JavaScript) - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Plain CSS** - Custom styling (no frameworks)

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcrypt** - Password hashing
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

```
E-Commerce Website/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/      # React Context providers
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Cart.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── config/
│   │   └── db.js          # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protection
│   ├── models/            # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Cart.js
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── cartRoutes.js
│   ├── scripts/
│   │   └── seedProducts.js  # Database seeding
│   ├── server.js          # Express server
│   ├── package.json
│   └── .env.example       # Environment variables template
│
└── README.md              # This file
```

## 🗄️ Database Models

### User Model
```javascript
{
  email: String (unique, required),
  password: String (hashed, min 6 chars),
  timestamps: true
}
```

### Product Model
```javascript
{
  name: String (required),
  price: Number (required, min 0),
  description: String (required),
  image: String (URL, required),
  timestamps: true
}
```

### Cart Model
```javascript
{
  user: ObjectId (ref: User, unique),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number (min 1)
  }],
  timestamps: true
}
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/signup` - Register new user
  - Body: `{ email, password }`
  - Returns: `{ user: { id, email }, token }`

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: `{ user: { id, email }, token }`

### Product Routes (`/api/products`)
- `GET /api/products` - Get all products
  - Returns: `{ products: [...] }`

- `GET /api/products/:id` - Get single product
  - Returns: `{ product: {...} }`

### Cart Routes (`/api/cart`) - Protected
- `GET /api/cart` - Get user's cart
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ cart: {...} }`

- `POST /api/cart` - Add item to cart
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ productId, quantity }`
  - Returns: `{ cart: {...} }`

- `PUT /api/cart/:id` - Update cart item quantity
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ quantity }`
  - Returns: `{ cart: {...} }`

- `DELETE /api/cart/:id` - Remove item from cart
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ cart: {...} }`

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone or Download the Project
```bash
cd "E-Commerce Website"
```

### Step 2: Set Up Backend

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Copy the example file
# On Windows PowerShell:
Copy-Item .env.example .env

# On Linux/Mac:
cp .env.example .env
```

4. Edit `.env` file with your MongoDB connection string:
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_change_this
PORT=5000
```

5. Start MongoDB (if running locally):
```bash
# Windows: Start MongoDB service
# Mac/Linux: mongod
```

6. Seed sample products (optional):
```bash
node scripts/seedProducts.js
```

7. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Step 3: Set Up Frontend

1. Open a new terminal and navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

### Step 4: Test the Application

1. **Sign Up**: Create a new account at `/signup`
2. **Browse Products**: View products on the home page
3. **Search**: Use the search bar to find products
4. **View Details**: Click on any product to see details
5. **Add to Cart**: Add products to your cart (requires login)
6. **Manage Cart**: Update quantities or remove items from cart

## 🔐 JWT Authentication Flow

### How It Works (ELI10 Style)

1. **Signup/Login**: User provides email and password
2. **Server Validation**: Backend checks if user exists and password is correct
3. **Token Generation**: Server creates a JWT token containing user ID
4. **Token Storage**: Frontend saves token in localStorage
5. **Protected Requests**: Frontend sends token in `Authorization` header
6. **Token Verification**: Backend middleware verifies token before allowing access
7. **User Access**: If token is valid, user can access protected routes

### Token Structure
```javascript
{
  id: "user_id_here",
  userId: "user_id_here",
  iat: timestamp,
  exp: expiration_timestamp
}
```

## 🎓 Learning Outcomes

By building this project, you'll learn:

1. **Full-Stack Development**: How frontend and backend communicate
2. **RESTful APIs**: Designing and implementing REST endpoints
3. **Authentication**: JWT-based authentication and authorization
4. **Database Design**: MongoDB schema design and relationships
5. **State Management**: React Context API for global state
6. **Routing**: Client-side routing with React Router
7. **API Integration**: Making HTTP requests and handling responses
8. **Security**: Password hashing, token-based auth, protected routes
9. **Error Handling**: Proper error handling on both frontend and backend
10. **Responsive Design**: Building mobile-friendly UIs

## 📝 Key Concepts Explained

### MongoDB Schema Design
- **User**: Stores user credentials (email, hashed password)
- **Product**: Stores product information (name, price, description, image)
- **Cart**: Links users to their cart items (one cart per user, many items per cart)

### React Context API
- **AuthContext**: Manages user authentication state globally
- **CartContext**: Manages shopping cart state globally
- Both contexts provide data and functions to all components

### Protected Routes
- Routes that require authentication are wrapped with `ProtectedRoute` component
- If user is not logged in, they're redirected to login page
- Token is checked on every protected API call

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check if MongoDB is running and MONGO_URI is correct
- **Port Already in Use**: Change PORT in `.env` file
- **JWT Secret Missing**: Make sure JWT_SECRET is set in `.env`

### Frontend Issues
- **API Calls Failing**: Check if backend is running on port 5000
- **CORS Errors**: Backend CORS is configured, ensure server is running
- **Token Not Working**: Clear localStorage and login again

## 🚢 Deployment (Optional)

### Backend Deployment (Heroku Example)
1. Create Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy: `git push heroku main`

### Frontend Deployment (Netlify/Vercel Example)
1. Build the React app: `npm run build`
2. Deploy the `build` folder to Netlify or Vercel
3. Update API_URL in `client/src/services/api.js` to production backend URL

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Built as a major project demonstrating full-stack development skills.

---

**Note**: This is a complete, production-ready structure suitable for interviews and portfolio projects. All core features are implemented with clean, commented code following best practices.
