# Quick Setup Guide

## Prerequisites Checklist
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Code editor (VS Code recommended)

## Quick Start (5 minutes)

### 1. Backend Setup
```bash
cd server
npm install
```

Create `.env` file in `server/` folder:
```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=my_super_secret_key_12345
PORT=5000
```

Start MongoDB (if local):
- Windows: Start MongoDB service from Services
- Mac/Linux: `mongod`

Seed products (optional):
```bash
node scripts/seedProducts.js
```

Start server:
```bash
npm start
```

### 2. Frontend Setup
Open new terminal:
```bash
cd client
npm install
npm start
```

### 3. Test
- Open http://localhost:3000
- Sign up a new account
- Browse products
- Add items to cart

## Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify MONGO_URI in .env is correct
- Check port 5000 is not in use

**Frontend can't connect to backend?**
- Ensure backend is running on port 5000
- Check browser console for CORS errors
- Verify API_URL in `client/src/services/api.js`

**Products not showing?**
- Run seed script: `node server/scripts/seedProducts.js`
- Check MongoDB connection

## Next Steps
- Read the full README.md for detailed documentation
- Customize products and styling
- Add more features as needed
