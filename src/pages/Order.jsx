
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  Package,
} from "lucide-react";

function Order({ cart = [], removeCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  const orderItems = location.state?.cart || cart;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    fullAddress: "",
  });

  const [payment, setPayment] = useState("COD");
  const [confirmed, setConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const [errors, setErrors] = useState({});

  const subtotal = orderItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || item.qty || 1),
    0
  );

  const delivery = subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!address.name.trim()) newErrors.name = "Enter your full name";

    if (!/^[6-9]\d{9}$/.test(address.phone))
      newErrors.phone = "Enter a valid 10-digit mobile number";

    if (!/^\d{6}$/.test(address.pincode))
      newErrors.pincode = "Enter a valid 6-digit PIN code";

    if (!address.city.trim()) newErrors.city = "Enter your city";

    if (!address.state.trim()) newErrors.state = "Enter your state";

    if (!address.fullAddress.trim())
      newErrors.fullAddress = "Enter your complete address";

    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const id = "MSH" + Date.now().toString().slice(-8);

    const order = {
      orderId: id,
      items: orderItems,
      address,
      payment,
      total,
      date: new Date().toLocaleDateString("en-IN"),
    };

    // Save order in browser localStorage
    const previousOrders = JSON.parse(
      localStorage.getItem("myOrders") || "[]"
    );

    localStorage.setItem(
      "myOrders",
      JSON.stringify([order, ...previousOrders])
    );

    setOrderId(id);
    setConfirmed(true);

    // Clear cart after successful order placement
    if (removeCart) {
      orderItems.forEach((item) => removeCart(item.id));
    }
  };

  // ORDER CONFIRMATION PAGE
  if (confirmed) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 text-center shadow-lg sm:p-10">

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={55} className="text-green-600" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for shopping with us. Your order has been confirmed.
          </p>

          <div className="mt-7 rounded-2xl bg-green-50 p-5">
            <p className="text-sm text-gray-600">Your Order ID</p>
            <h2 className="mt-2 text-2xl font-extrabold text-green-700">
              {orderId}
            </h2>
          </div>

          <div className="mt-7 rounded-2xl border border-gray-100 p-5 text-left">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
              <Package className="text-pink-600" />
              Order Details
            </h3>

            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3 border-b py-3 text-sm"
              >
                <span className="text-gray-700">
                  {item.name} × {item.quantity || item.qty || 1}
                </span>

                <span className="font-semibold">
                  ₹{Number(item.price) * Number(item.quantity || item.qty || 1)}
                </span>
              </div>
            ))}

            <div className="mt-4 flex justify-between font-bold">
              <span>Total Amount</span>
              <span className="text-pink-600">₹{total}</span>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600">
              <p className="font-bold text-gray-900">Delivery Address</p>
              <p className="mt-2">{address.name}</p>
              <p>{address.fullAddress}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p>Mobile: {address.phone}</p>

              <p className="mt-3">
                Payment: <b>{payment === "COD" ? "Cash on Delivery" : payment}</b>
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            <Truck className="mx-auto mb-2" size={25} />
            Your order is being prepared for delivery!
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-7 w-full rounded-xl bg-pink-600 py-4 font-bold text-white transition hover:bg-pink-700"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  // CHECKOUT PAGE
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">

      <div className="mx-auto max-w-6xl">

        <button
          onClick={() => navigate("/cart")}
          className="mb-6 flex items-center gap-2 font-semibold text-gray-600 hover:text-pink-600"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </button>

        <h1 className="mb-2 text-3xl font-extrabold text-gray-900">
          Checkout
        </h1>

        <p className="mb-8 text-gray-500">
          Complete your delivery details and place your order.
        </p>

        <div className="grid gap-7 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* ADDRESS */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
                <MapPin className="text-pink-600" />
                Delivery Address
              </h2>

              <form id="orderForm" onSubmit={handlePlaceOrder}>
                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={address.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Mobile Number
                    </label>
                    <input
                      name="phone"
                      value={address.phone}
                      onChange={handleChange}
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      PIN Code
                    </label>
                    <input
                      name="pincode"
                      value={address.pincode}
                      onChange={handleChange}
                      maxLength={6}
                      placeholder="6-digit PIN code"
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      City
                    </label>
                    <input
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                      placeholder="Enter city"
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">
                      State
                    </label>
                    <input
                      name="state"
                      value={address.state}
                      onChange={handleChange}
                      placeholder="Enter state"
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-500">{errors.state}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-semibold">
                      Complete Address
                    </label>
                    <textarea
                      name="fullAddress"
                      value={address.fullAddress}
                      onChange={handleChange}
                      rows={3}
                      placeholder="House number, street, area, landmark..."
                      className="w-full rounded-xl border p-3 outline-none focus:border-pink-500"
                    />
                    {errors.fullAddress && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.fullAddress}
                      </p>
                    )}
                  </div>

                </div>
              </form>
            </section>

            {/* PAYMENT METHOD */}
            <section className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-6 flex items-center gap-3 text-xl font-bold">
                <CreditCard className="text-pink-600" />
                Select Payment Method
              </h2>

              <div className="space-y-3">

                {[
                  {
                    id: "COD",
                    title: "Cash on Delivery",
                    description: "Pay when your order arrives",
                    icon: "💵",
                  },
                  {
                    id: "UPI",
                    title: "UPI Payment",
                    description: "Pay using Google Pay, PhonePe or Paytm",
                    icon: "📱",
                  },
                  {
                    id: "Card",
                    title: "Credit / Debit Card",
                    description: "Pay using your bank card",
                    icon: "💳",
                  },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                      payment === method.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="h-5 w-5 accent-pink-600"
                    />

                    <span className="text-2xl">{method.icon}</span>

                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">
                        {method.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {method.description}
                      </p>
                    </div>

                    {payment === method.id && (
                      <CheckCircle className="text-pink-600" size={22} />
                    )}
                  </label>
                ))}

              </div>
            </section>

          </div>

          {/* RIGHT SIDE ORDER SUMMARY */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            {orderItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 border-b py-4"
                >
                  <img
                    src={item.img || item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg bg-gray-100 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity || item.qty || 1}
                    </p>
                  </div>

                  <p className="font-bold">
                    ₹{Number(item.price) * Number(item.quantity || item.qty || 1)}
                  </p>
                </div>
              ))
            )}

            <div className="mt-5 space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Delivery Charges</span>
                <span className={delivery === 0 ? "text-green-600" : ""}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>

              <div className="flex justify-between border-t pt-4 text-lg font-extrabold">
                <span>Total</span>
                <span className="text-pink-600">₹{total}</span>
              </div>

            </div>

            <button
              type="submit"
              form="orderForm"
              disabled={orderItems.length === 0}
              className="mt-7 w-full rounded-xl bg-pink-600 py-4 font-bold text-white shadow-lg shadow-pink-100 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order • ₹{total}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={17} className="text-green-600" />
              Secure checkout
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Order;
