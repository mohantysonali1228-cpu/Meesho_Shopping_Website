import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Listing from "./pages/Listing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Order from "./pages/Order";
import MyOrder from "./pages/MyOrder";

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

// Get separate wishlist key for each user
const getWishlistKey = (user) => {
  if (!user) return "meesho_wishlist_guest";

  const identifier =
    user.email ||
    user.id ||
    user._id ||
    user.phone ||
    user.username;

  if (!identifier) {
    return "meesho_wishlist_guest";
  }

  return `meesho_wishlist_${String(identifier)
    .trim()
    .toLowerCase()}`;
};

function App() {
  const location = useLocation();

  // Hide footer on Profile, Login and Register
  const hideFooter = [
    "/profile",
    "/login",
    "/register",
  ].includes(location.pathname);

  // User state
  const [user, setUser] = useState(() =>
    read("meesho_user", null)
  );

  // Cart state
  const [cart, setCart] = useState(() =>
    read("meesho_cart", [])
  );

  // Wishlist state
  const [wishlist, setWishlist] = useState(() =>
    read(
      getWishlistKey(read("meesho_user", null)),
      []
    )
  );

  // Save cart
  useEffect(() => {
    localStorage.setItem(
      "meesho_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Save wishlist for active user
  useEffect(() => {
    localStorage.setItem(
      getWishlistKey(user),
      JSON.stringify(wishlist)
    );
  }, [wishlist, user]);

  // Save logged-in user
  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "meesho_user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("meesho_user");
    }
  }, [user]);

  // Login / Register handler
  const handleSetUser = (newUser) => {
    const loggedInUser =
      typeof newUser === "function"
        ? newUser(user)
        : newUser;

    setUser(loggedInUser);

    // Load only this user's wishlist
    setWishlist(
      read(getWishlistKey(loggedInUser), [])
    );
  };

  // Logout
  const handleLogout = () => {
    // Clear cart
    setCart([]);
    localStorage.removeItem("meesho_cart");

    // Load guest wishlist
    setWishlist(
      read("meesho_wishlist_guest", [])
    );

    // Logout user
    setUser(null);
  };

  // Add product to cart
  // Also remove the same product from wishlist
  const addToCart = (product, qty = 1) => {
    setCart((oldCart) => {
      const existing = oldCart.find(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (existing) {
        return oldCart.map((item) =>
          String(item.id) === String(product.id)
            ? {
                ...item,
                qty: (item.qty || 1) + qty,
              }
            : item
        );
      }

      return [...oldCart, { ...product, qty }];
    });

    // Remove from current user's wishlist
    setWishlist((oldWishlist) =>
      oldWishlist.filter(
        (item) =>
          String(item.id) !== String(product.id)
      )
    );
  };

  // Change cart quantity
  const changeQty = (id, delta) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              qty: Math.max(
                1,
                (item.qty || 1) + delta
              ),
            }
          : item
      )
    );
  };

  // Remove product from cart
  const removeCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  // Add or remove wishlist product
  const toggleWish = (product) => {
    setWishlist((oldWishlist) => {
      const exists = oldWishlist.some(
        (item) =>
          String(item.id) === String(product.id)
      );

      if (exists) {
        return oldWishlist.filter(
          (item) =>
            String(item.id) !== String(product.id)
        );
      }

      return [...oldWishlist, product];
    });
  };

  // Shared props
  const shared = {
    cart,
    setCart,
    wishlist,
    user,
    setUser: handleSetUser,
    addToCart,
    changeQty,
    removeCart,
    toggleWish,
    handleLogout,
  };

  return (
    <>
      {/* Navbar always visible */}
      <Header {...shared} />

      <ScrollToTop />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home {...shared} />}
        />

        {/* Category */}
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
          element={<Login setUser={handleSetUser} />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register setUser={handleSetUser} />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile {...shared} />}
        />

        {/* My Orders */}
        <Route
          path="/my-orders"
          element={<MyOrder />}
        />

        {/* Checkout */}
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

      {/* Footer hidden on Profile, Login and Register */}
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;