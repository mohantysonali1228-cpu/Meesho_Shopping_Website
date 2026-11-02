
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
  const [cart, setCart] = useState(() =>
    read("meesho_cart", [])
  );

  const [wishlist, setWishlist] = useState(() =>
    read("meesho_wishlist", [])
  );

  const [user, setUser] = useState(() =>
    read("meesho_user", null)
  );

  // Save cart
  useEffect(() => {
    localStorage.setItem("meesho_cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem(
      "meesho_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Save user
  useEffect(() => {
    if (user) {
      localStorage.setItem("meesho_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("meesho_user");
    }
  }, [user]);

  // Add to cart
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

  // Change quantity
  const changeQty = (id, delta) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
          : item
      )
    );
  };

  // Remove from cart
  const removeCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  // Add or remove wishlist
  const toggleWish = (product) => {
    setWishlist((oldWishlist) =>
      oldWishlist.some((item) => item.id === product.id)
        ? oldWishlist.filter((item) => item.id !== product.id)
        : [...oldWishlist, product]
    );
  };

  // Shared props
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
        <Route path="/" element={<Home {...shared} />} />

        <Route
          path="/category/:category"
          element={<Listing {...shared} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails {...shared} />}
        />

        <Route path="/cart" element={<Cart {...shared} />} />

        <Route
          path="/wishlist"
          element={<Wishlist {...shared} />}
        />

        <Route
          path="/login"
          element={<Login setUser={setUser} />}
        />

        <Route
          path="/register"
          element={<Register setUser={setUser} />}
        />

        <Route
          path="/profile"
          element={<Profile {...shared} />}
        />

        <Route path="*" element={<Home {...shared} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
