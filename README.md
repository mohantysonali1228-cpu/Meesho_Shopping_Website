# Meesho Product Listing UI

A responsive frontend-only e-commerce demo inspired by Indian online shopping interfaces. Built with React, Vite, JavaScript and Tailwind CSS.

## Features
- 12 products rendered dynamically from static JavaScript data
- Responsive product grid, search, hover effects and reusable components
- Add to cart, quantity increase/decrease, remove items and totals
- Cart persisted in browser `localStorage`
- Checkout form with validation for name, Indian mobile number, address and 6-digit pincode
- Simulated order confirmation with customer details, ordered products and total cost
- No backend, API, payment gateway or real purchase

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  components/
    Navbar.jsx
    ProductCard.jsx
    ProductList.jsx
    Cart.jsx
    Checkout.jsx
    OrderConfirmation.jsx
  App.jsx
  products.js
  index.css
  main.jsx
```

## Note
This is a learning/demo project inspired by common e-commerce layouts. It is not affiliated with Meesho. Product images are loaded from Unsplash and therefore require an internet connection.
