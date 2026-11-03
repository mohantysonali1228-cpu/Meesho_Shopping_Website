
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ShieldCheck,
  ArrowLeft,
  Truck,
  ShoppingBag,
} from "lucide-react";

import { money } from "../data/products";

function Cart({ cart = [], changeQty, removeCart }) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.qty,
    0
  );

  const totalItems = cart.reduce(
    (sum, product) => sum + product.qty,
    0
  );

  const handleCheckout = () => {
    if (!cart.length) return;

    navigate("/order", {
      state: { cart },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADING */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-pink-600">
            YOUR SHOPPING BAG
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Cart{" "}
            <span className="text-lg font-medium text-gray-500">
              ({totalItems} items)
            </span>
          </h1>
        </div>

        {!cart.length ? (
          /* EMPTY CART */
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">

            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
              <ShoppingCart size={42} className="text-pink-600" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mb-7 text-gray-500">
              Looks like you haven't added anything yet.
              Start shopping now!
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-7 py-3 font-semibold text-white transition-colors hover:bg-pink-700"
            >
              <ShoppingBag size={19} />
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* CART CONTENT */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* CART PRODUCTS */}
            <div className="space-y-5 lg:col-span-2">

              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:p-5"
                >

                  {/* PRODUCT IMAGE */}
                  <Link
                    to={`/product/${product.id}`}
                    className="shrink-0"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-44 w-full rounded-lg bg-gray-100 object-cover sm:h-40 sm:w-36"
                    />
                  </Link>

                  {/* PRODUCT DETAILS */}
                  <div className="flex flex-1 flex-col">

                    <div className="flex justify-between gap-3">

                      <div>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-lg font-semibold text-gray-900 transition-colors hover:text-pink-600"
                        >
                          {product.name}
                        </Link>

                        <p className="mt-2 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>

                      {/* REMOVE BUTTON */}
                      <button
                        type="button"
                        onClick={() => removeCart(product.id)}
                        className="flex h-fit items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-red-600"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={17} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>

                    </div>

                    {/* PRICE */}
                    <div className="mt-4">
                      <strong className="text-xl font-bold text-gray-900">
                        {money(product.price)}
                      </strong>
                    </div>

                    {/* QUANTITY CONTROL */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">

                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">

                        <button
                          type="button"
                          onClick={() => changeQty(product.id, -1)}
                          disabled={product.qty <= 1}
                          className="flex h-9 w-10 items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-12 text-center font-semibold text-gray-900">
                          {product.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => changeQty(product.id, 1)}
                          className="flex h-9 w-10 items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      <p className="text-sm font-semibold text-gray-700">
                        Total: {money(product.price * product.qty)}
                      </p>

                    </div>

                  </div>
                </div>
              ))}

              {/* CONTINUE SHOPPING */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-semibold text-pink-600 transition-colors hover:text-pink-700"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>

            </div>

            {/* PRICE SUMMARY */}
            <aside className="lg:col-span-1">

              <div className="sticky top-28 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Price Details
                </h2>

                <div className="space-y-5">

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Products ({totalItems} items)</span>
                    <span className="font-semibold text-gray-900">
                      {money(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Charges</span>
                    <span className="font-semibold text-green-600">
                      FREE
                    </span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Discount</span>
                    <span className="font-semibold text-green-600">
                      {money(0)}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-gray-300 pt-5">

                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-gray-900">
                        Total Amount
                      </span>

                      <span className="text-2xl font-extrabold text-pink-600">
                        {money(subtotal)}
                      </span>
                    </div>

                  </div>

                </div>

                {/* CONTINUE TO PAYMENT */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-7 w-full rounded-lg bg-pink-600 py-3.5 font-bold text-white shadow-md shadow-pink-100 transition-all hover:bg-pink-700 active:scale-[0.98]"
                >
                  Continue to Payment →
                </button>

                {/* SECURITY */}
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                  <ShieldCheck size={17} className="text-green-600" />
                  Safe and secure checkout
                </div>

                {/* DELIVERY INFORMATION */}
                <div className="mt-6 flex items-center gap-3 rounded-lg bg-green-50 p-3">
                  <Truck size={22} className="text-green-600" />

                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      Free Delivery
                    </p>

                    <p className="text-xs text-green-700">
                      Enjoy free delivery on your order.
                    </p>
                  </div>
                </div>

              </div>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}

export default Cart;
