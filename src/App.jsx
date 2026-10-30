
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import CartDrawer from "./components/CartDrawer";
import CheckoutForm from "./components/CheckoutForm";
import OrderConfirmation from "./components/OrderConfirmation";

import productsData from "./data/products";

function App() {
  const [products] = useState(productsData);

  // Load cart from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("meeshoCart");
      const parsed = savedCart ? JSON.parse(savedCart) : [];

      if (!Array.isArray(parsed)) return [];

      return parsed.filter(
        (item) =>
          item &&
          Number.isInteger(item.id) &&
          productsData.some((product) => product.id === item.id) &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
      );
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [order, setOrder] = useState(null);

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("meeshoCart", JSON.stringify(cart));
  }, [cart]);

  // Add product
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  // Total cart items
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Search
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsCartOpen(false);
    setShowCheckout(true);
  };

  // Place order
  const handleOrderSubmit = (orderDetails) => {
    setOrder(orderDetails);
    setCart([]);
    setShowCheckout(false);
    setShowConfirmation(true);
  };

  // Continue shopping
  const handleContinueShopping = () => {
    setShowConfirmation(false);
    setOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        search={search}
        setSearch={setSearch}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100">

        <div className="max-w-7xl mx-auto px-4 py-14 flex flex-col md:flex-row items-center justify-between gap-8">

          <div className="max-w-xl">

            <p className="text-pink-600 font-semibold mb-3">
              WELCOME TO ONLINE SHOPPING
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Discover Your
              <span className="text-pink-600"> Style </span>
              With Amazing Deals!
            </h1>

            <p className="text-gray-600 mt-4 text-lg">
              Shop the latest fashion, footwear and accessories
              at affordable prices.
            </p>

            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-6 bg-pink-600 text-white px-7 py-3 rounded-lg font-bold hover:bg-pink-700 transition"
            >
              Shop Now →
            </button>

          </div>

          <div className="text-8xl md:text-9xl">
            🛍️
          </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <p className="text-2xl">🚚</p>
            <h3 className="font-bold mt-2">Free Delivery</h3>
            <p className="text-sm text-gray-500">On selected orders</p>
          </div>

          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <p className="text-2xl">💰</p>
            <h3 className="font-bold mt-2">Best Prices</h3>
            <p className="text-sm text-gray-500">Affordable products</p>
          </div>

          <div className="bg-white p-4 rounded-lg text-center shadow-sm">
            <p className="text-2xl">⭐</p>
            <h3 className="font-bold mt-2">Quality Products</h3>
            <p className="text-sm text-gray-500">Customer satisfaction</p>
          </div>

        </div>
      </section>

      {/* Products */}
      <div id="products">
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-8 mt-10">
        <h2 className="text-2xl font-bold text-pink-400">
          meesho.
        </h2>

        <p className="text-gray-400 mt-2">
          Your Favourite Online Shopping Destination
        </p>

        <p className="text-gray-500 text-sm mt-4">
          © 2026 Meesho UI Project. Frontend Demo Only.
        </p>
      </footer>

      {/* Cart */}
      <CartDrawer
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout */}
      {showCheckout && (
        <CheckoutForm
          cart={cart}
          onSubmit={handleOrderSubmit}
          onClose={() => setShowCheckout(false)}
        />
      )}

      {/* Order Confirmation */}
      {showConfirmation && (
        <OrderConfirmation
          order={order}
          onClose={handleContinueShopping}
        />
      )}

    </div>
  );
}

export default App;
