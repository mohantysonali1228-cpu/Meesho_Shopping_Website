
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";

// Pages
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Order from "./pages/Order";

// Read data from localStorage
const read = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return fallback;
  }
};

function App() {
  // Cart state
  const [cart, setCart] = useState(() =>
    read("meesho_cart", [])
  );

  // Wishlist state
  const [wishlist, setWishlist] = useState(() =>
    read("meesho_wishlist", [])
  );

  // User state
  const [user, setUser] = useState(() =>
    read("meesho_user", null)
  );

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("meesho_cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(
      "meesho_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("meesho_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("meesho_user");
    }
  }, [user]);

  // Add product to cart
  const addToCart = (product, qty = 1) => {
    setCart((oldCart) => {
      const existing = oldCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: (item.qty || 1) + qty }
            : item
        );
      }

      return [...oldCart, { ...product, qty }];
    });
  };

  // Change product quantity
  const changeQty = (id, delta) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, (item.qty || 1) + delta),
            }
          : item
      )
    );
  };

  // Remove product from cart
  const removeCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  // Add or remove product from wishlist
  const toggleWish = (product) => {
    setWishlist((oldWishlist) =>
      oldWishlist.some((item) => item.id === product.id)
        ? oldWishlist.filter((item) => item.id !== product.id)
        : [...oldWishlist, product]
    );
  };

  // Shared props for all pages
  const shared = {
    cart,
    wishlist,
    user,
    setUser,
    addToCart,
    changeQty,
    removeCart,
    toggleWish,
  };

  return (
    <>
      <Header {...shared} />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home {...shared} />}
        />

        {/* Product Category */}
        <Route
          path="/category/:category"
          element={<Listing {...shared} />}
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails {...shared} />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart {...shared} />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist {...shared} />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile {...shared} />}
        />

        {/* Order Checkout */}
        <Route
          path="/order"
          element={
            <Order
              cart={cart}
              removeCart={removeCart}
            />
          }
        />

        {/* Page Not Found */}
        <Route
          path="*"
          element={<Home {...shared} />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
