import { useEffect, useMemo, useState } from "react";
import products from "./data/products";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

const CART_KEY = "meesho-demo-cart";
const ORDER_KEY = "meesho-demo-last-order";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) => products.some((p) => p.id === item.id))
      .map((item) => {
        const product = products.find((p) => p.id === item.id);
        const quantity = Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1;
        return { ...product, quantity };
      });
  } catch { return []; }
}

export default function App() {
  const [cart, setCart] = useState(readCart);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => `${product.title} ${product.category}`.toLowerCase().includes(query));
  }, [search]);

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id);
      if (found) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  }
  function increase(id) { setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)); }
  function decrease(id) { setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)); }
  function remove(id) { setCart((current) => current.filter((item) => item.id !== id)); }
  function startCheckout() { setCartOpen(false); setCheckoutOpen(true); }
  function placeOrder(customer) {
    const nextOrder = { items: cart.map((item) => ({ ...item })), customer, createdAt: new Date().toISOString() };
    setOrder(nextOrder);
    try { localStorage.setItem(ORDER_KEY, JSON.stringify(nextOrder)); } catch {}
    setCart([]);
    setCheckoutOpen(false);
  }
  function continueShopping() { setOrder(null); setCartOpen(false); setCheckoutOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} search={search} setSearch={setSearch} />
      <main>
        <section className="px-4 pt-5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-3xl bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 md:flex-row">
            <div className="flex flex-1 flex-col justify-center p-7 sm:p-10 lg:p-14">
              <span className="w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-pink-700">Everyday style, easy prices</span>
              <h1 className="mt-4 max-w-xl text-3xl font-black leading-tight text-gray-900 sm:text-5xl">Find your style.<br /><span className="text-pink-600">Love your price.</span></h1>
              <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">Explore fashion, accessories and everyday essentials — all in one place.</p>
              <a href="#products" className="mt-6 w-fit rounded-xl bg-pink-600 px-5 py-3 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-0.5 hover:bg-pink-700">Explore Collection →</a>
            </div>
            <div className="flex min-h-48 flex-1 items-center justify-center bg-gradient-to-br from-pink-200/60 to-purple-200/60 p-6">
              <div className="grid w-full max-w-sm grid-cols-2 gap-3">
                <div className="rotate-[-3deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lg"><img className="h-36 w-full rounded-xl object-cover sm:h-44" src={products[0].image} alt="Fashion collection" /><p className="px-1 py-2 text-sm font-bold">Ethnic styles</p></div>
                <div className="mt-7 rotate-[3deg] overflow-hidden rounded-2xl bg-white p-2 shadow-lg"><img className="h-36 w-full rounded-xl object-cover sm:h-44" src={products[2].image} alt="Accessories collection" /><p className="px-1 py-2 text-sm font-bold">Everyday finds</p></div>
              </div>
            </div>
          </div>
        </section>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 pt-5 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gray-100 bg-white p-4"><p className="font-bold">🚚 Convenient shopping</p><p className="mt-1 text-sm text-gray-500">Browse your favourites with ease</p></div>
          <div className="rounded-xl border border-gray-100 bg-white p-4"><p className="font-bold">💗 Styles for everyone</p><p className="mt-1 text-sm text-gray-500">Discover fashion and essentials</p></div>
          <div className="rounded-xl border border-gray-100 bg-white p-4"><p className="font-bold">🔒 Safe demo checkout</p><p className="mt-1 text-sm text-gray-500">No payment or real order is made</p></div>
        </div>
        <ProductList products={visibleProducts} onAdd={addToCart} />
      </main>
      <footer className="border-t bg-white px-4 py-7 text-center text-sm text-gray-500">© 2026 Meesho Store UI Demo · Built with React & Tailwind CSS · Not affiliated with Meesho</footer>
      {cartOpen && <Cart cart={cart} onClose={() => setCartOpen(false)} onIncrease={increase} onDecrease={decrease} onRemove={remove} onCheckout={startCheckout} />}
      {checkoutOpen && <Checkout cart={cart} onBack={() => { setCheckoutOpen(false); setCartOpen(true); }} onSubmit={placeOrder} />}
      {order && <OrderConfirmation order={order} onContinue={continueShopping} />}
    </div>
  );
}
