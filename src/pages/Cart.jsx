
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

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-pink-600 mb-2">
            YOUR SHOPPING BAG
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            My Cart{" "}
            <span className="text-lg font-medium text-gray-500">
              ({totalItems} items)
            </span>
          </h1>
        </div>

        {!cart.length ? (

          /* Empty Cart */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm py-16 px-5 text-center">

            <div className="w-24 h-24 mx-auto rounded-full bg-pink-50 flex items-center justify-center mb-6">
              <ShoppingCart size={42} className="text-pink-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-7">
              Looks like you haven't added anything yet.
              Start shopping now!
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-pink-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              <ShoppingBag size={19} />
              Continue Shopping
            </Link>

          </div>

        ) : (

          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Products */}
            <div className="lg:col-span-2 space-y-5">

              {cart.map((product) => (

                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row gap-5"
                >

                  {/* Product Image */}
                  <Link
                    to={`/product/${product.id}`}
                    className="shrink-0"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full sm:w-36 h-44 sm:h-40 object-cover rounded-lg bg-gray-100"
                    />
                  </Link>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col">

                    <div className="flex justify-between gap-3">

                      <div>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors"
                        >
                          {product.name}
                        </Link>

                        <p className="text-sm text-gray-500 mt-2">
                          {product.category}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeCart(product.id)}
                        className="h-fit flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-600 transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={17} />
                        <span className="hidden sm:inline">
                          Remove
                        </span>
                      </button>

                    </div>

                    {/* Price */}
                    <div className="mt-4">
                      <strong className="text-xl font-bold text-gray-900">
                        {money(product.price)}
                      </strong>
                    </div>

                    {/* Quantity Control */}
                    <div className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-4">

                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                        <button
                          type="button"
                          onClick={() => changeQty(product.id, -1)}
                          disabled={product.qty <= 1}
                          className="w-10 h-9 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="w-12 text-center font-semibold text-gray-900">
                          {product.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => changeQty(product.id, 1)}
                          className="w-10 h-9 flex items-center justify-center text-gray-600 hover:bg-pink-50 hover:text-pink-600"
                          aria-label="Increase quantity"
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

              {/* Continue Shopping */}
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
              >
                <ArrowLeft size={18} />
                Continue Shopping
              </Link>

            </div>

            {/* Price Summary */}
            <aside className="lg:col-span-1">

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-28">

                <h2 className="text-xl font-bold text-gray-900 mb-6">
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

                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">
                        Total Amount
                      </span>

                      <span className="text-2xl font-extrabold text-pink-600">
                        {money(subtotal)}
                      </span>
                    </div>

                  </div>

                </div>

                {/* Checkout */}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full mt-7 bg-pink-600 text-white py-3.5 rounded-lg font-bold hover:bg-pink-700 active:scale-[0.98] transition-all shadow-md shadow-pink-100"
                >
                  Continue to Payment
                </button>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 mt-5 text-xs text-gray-500">
                  <ShieldCheck size={17} className="text-green-600" />
                  Safe and secure payments
                </div>

                {/* Delivery Information */}
                <div className="flex items-center gap-3 mt-6 p-3 bg-green-50 rounded-lg">
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
