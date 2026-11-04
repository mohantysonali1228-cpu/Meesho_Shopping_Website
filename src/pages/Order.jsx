import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Plus,
  CheckCircle2,
  CreditCard,
  Wallet,
  Smartphone,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Package,
  User,
  Phone,
  Home,
  Tag,
} from "lucide-react";

import { money } from "../data/products";

function Order({ cart = [], removeCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  const orderItems = location.state?.cart || cart;

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("meesho_user")) || {};
    } catch {
      return {};
    }
  })();

  const addressKey = currentUser.email
    ? `addressBook_${currentUser.email}`
    : "addressBook_guest";

  const getSavedAddresses = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(addressKey)) || [];
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  };

  const [savedAddresses, setSavedAddresses] = useState(getSavedAddresses);

  const defaultAddress =
    savedAddresses.find((address) => address.isDefault) ||
    savedAddresses[0] ||
    null;

  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [showAddressList, setShowAddressList] = useState(false);
  const [showNewAddressForm, setShowNewAddressForm] = useState(
    savedAddresses.length === 0
  );

  const [newAddress, setNewAddress] = useState({
    fullName: currentUser.name || "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    area: "",
    landmark: "",
    addressType: "Home",
    isDefault: false,
  });

  const [payment, setPayment] = useState("COD");
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subtotal = orderItems.reduce(
    (sum, product) =>
      sum +
      Number(product.price) *
        Number(product.qty || product.quantity || 1),
    0
  );

  const delivery = subtotal >= 499 ? 0 : 40;

  // Coupon details received from Cart page
  const coupon = location.state?.coupon || null;

  const couponRules = {
    WELCOME10: { discount: 10, min: 500, max: 699 },
    MEESHO15: { discount: 15, min: 700, max: 999 },
    DIWALI20: { discount: 20, min: 1000, max: Infinity },
  };

  const validCoupon = coupon
    ? couponRules[coupon.code]
    : null;

  const isCouponValid =
    validCoupon &&
    subtotal >= validCoupon.min &&
    subtotal <= validCoupon.max;

  const discount = isCouponValid
    ? Math.round((subtotal * validCoupon.discount) / 100)
    : 0;

  const total = Math.max(0, subtotal - discount + delivery);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;

    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveNewAddress = () => {
    const {
      fullName,
      phone,
      pincode,
      state,
      city,
      area,
    } = newAddress;

    if (
      !fullName.trim() ||
      !phone.trim() ||
      !pincode.trim() ||
      !state.trim() ||
      !city.trim() ||
      !area.trim()
    ) {
      setError("Please fill all required address fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    const addressToSave = {
      ...newAddress,
      id: Date.now(),
      isDefault:
        savedAddresses.length === 0 || newAddress.isDefault,
    };

    let updatedAddresses = [...savedAddresses, addressToSave];

    if (addressToSave.isDefault) {
      updatedAddresses = updatedAddresses.map((address) => ({
        ...address,
        isDefault: address.id === addressToSave.id,
      }));
    }

    localStorage.setItem(addressKey, JSON.stringify(updatedAddresses));

    setSavedAddresses(updatedAddresses);
    setSelectedAddress(addressToSave);
    setShowNewAddressForm(false);
    setShowAddressList(false);
    setError("");
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressList(false);
    setShowNewAddressForm(false);
    setError("");
  };

  const placeOrder = () => {
    if (!orderItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!selectedAddress && !showNewAddressForm) {
      setError("Please select a delivery address.");
      return;
    }

    if (!selectedAddress) {
      setError("Please save your delivery address first.");
      return;
    }

    const fullAddress = [
      selectedAddress.area,
      selectedAddress.landmark,
    ]
      .filter(Boolean)
      .join(", ");

    const orderAddress = {
      name: selectedAddress.fullName,
      phone: selectedAddress.phone,
      pincode: selectedAddress.pincode,
      city: selectedAddress.city,
      state: selectedAddress.state,
      fullAddress,
      addressType: selectedAddress.addressType,
    };

    const orderId =
      "MSH" + Date.now().toString().slice(-8);

    const orderData = {
      orderId,
      userEmail: (currentUser.email || "").trim().toLowerCase(),
      items: orderItems,
      address: orderAddress,
      payment,
      subtotal,
      delivery,
      couponCode: isCouponValid ? coupon.code : null,
      discount,
      total,
      date: new Date().toISOString(),
    };

    try {
      // Login check
      if (!currentUser.email) {
        setError("Please login before placing an order.");
        return;
      }

      // Each user gets a separate order storage key
      const userOrdersKey = `myOrders_${currentUser.email
        .trim()
        .toLowerCase()}`;

      const previousOrders = JSON.parse(
        localStorage.getItem(userOrdersKey) || "[]"
      );

      // Save only in the logged-in user's order list
      localStorage.setItem(
        userOrdersKey,
        JSON.stringify([orderData, ...previousOrders])
      );

      orderItems.forEach((item) => {
        removeCart?.(item.id);
      });

      setConfirmedOrder(orderData);
      setError("");
    } catch {
      setError("Unable to place order. Please try again.");
    }
  };

  // Order Confirmation
  if (confirmedOrder) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-10">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 size={45} className="text-green-600" />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for shopping with Meesho.
          </p>

          <div className="mt-7 rounded-xl bg-gray-50 p-5 text-left">
            <div className="flex justify-between gap-3 border-b border-gray-200 pb-4">
              <span className="text-sm text-gray-500">Order ID</span>
              <span className="text-sm font-bold text-gray-900">
                {confirmedOrder.orderId}
              </span>
            </div>

            <div className="flex justify-between gap-3 py-4">
              <span className="text-sm text-gray-500">Payment</span>
              <span className="text-sm font-semibold text-gray-900">
                {confirmedOrder.payment}
              </span>
            </div>

            <div className="flex justify-between gap-3 border-t border-gray-200 pt-4">
              <span className="font-bold text-gray-900">
                Total Paid
              </span>
              <span className="text-xl font-extrabold text-pink-600">
                {money(confirmedOrder.total)}
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-gray-200 p-4 text-left">
            <p className="mb-2 flex items-center gap-2 font-bold text-gray-900">
              <MapPin size={18} className="text-pink-600" />
              Delivery Address
            </p>

            <p className="font-semibold text-gray-800">
              {confirmedOrder.address.name}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              {confirmedOrder.address.fullAddress}
            </p>

            <p className="text-sm text-gray-600">
              {confirmedOrder.address.city},{" "}
              {confirmedOrder.address.state} -{" "}
              {confirmedOrder.address.pincode}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Phone: {confirmedOrder.address.phone}
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => navigate("/my-orders")}
              className="flex-1 rounded-lg bg-pink-600 py-3 font-bold text-white hover:bg-pink-700"
            >
              View My Orders
            </button>

            <button
              onClick={() => navigate("/")}
              className="flex-1 rounded-lg border border-gray-300 py-3 font-bold text-gray-700 hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </main>
    );
  }

  if (!orderItems.length) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <Package size={55} className="mb-4 text-gray-300" />

        <h2 className="text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>

        <button
          onClick={() => navigate("/")}
          className="mt-5 rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate("/cart")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft size={17} />
          Back to Cart
        </button>

        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">
          Checkout
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">

            {/* ADDRESS SECTION */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <MapPin size={21} className="text-pink-600" />
                  Delivery Address
                </h2>

                {savedAddresses.length > 0 && selectedAddress && (
                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    Saved Address
                  </span>
                )}
              </div>

              {/* SELECTED ADDRESS */}
              {selectedAddress && !showNewAddressForm && (
                <div className="rounded-xl border border-pink-200 bg-pink-50/50 p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100">
                        <Home size={18} className="text-pink-600" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-bold text-gray-900">
                            {selectedAddress.fullName}
                          </p>

                          <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-pink-600">
                            {selectedAddress.addressType || "Home"}
                          </span>

                          {selectedAddress.isDefault && (
                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Default
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {selectedAddress.area}
                          {selectedAddress.landmark
                            ? `, ${selectedAddress.landmark}`
                            : ""}
                          <br />
                          {selectedAddress.city},{" "}
                          {selectedAddress.state} -{" "}
                          {selectedAddress.pincode}
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                          <Phone size={14} />
                          {selectedAddress.phone}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2
                      size={22}
                      className="shrink-0 text-green-600"
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 border-t border-pink-100 pt-4">

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressList(!showAddressList);
                        setShowNewAddressForm(false);
                      }}
                      className="text-sm font-bold text-pink-600 hover:text-pink-700"
                    >
                      {showAddressList ? "Close Addresses" : "Change Address"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowNewAddressForm(true);
                        setShowAddressList(false);
                        setError("");
                      }}
                      className="flex items-center gap-1 text-sm font-bold text-gray-700 hover:text-pink-600"
                    >
                      <Plus size={16} />
                      Add New Address
                    </button>

                  </div>
                </div>
              )}

              {/* OTHER SAVED ADDRESSES */}
              {showAddressList && (
                <div className="mt-4 space-y-3">

                  <h3 className="text-sm font-bold text-gray-700">
                    Select Another Saved Address
                  </h3>

                  {savedAddresses.map((address) => {
                    const isSelected =
                      selectedAddress?.id === address.id;

                    return (
                      <button
                        type="button"
                        key={address.id}
                        onClick={() => selectAddress(address)}
                        className={`w-full rounded-xl border p-4 text-left transition ${
                          isSelected
                            ? "border-pink-500 bg-pink-50"
                            : "border-gray-200 hover:border-pink-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">

                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-gray-900">
                                {address.fullName}
                              </span>

                              <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                {address.addressType || "Home"}
                              </span>

                              {address.isDefault && (
                                <span className="text-xs font-semibold text-green-600">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-sm leading-5 text-gray-600">
                              {address.area}
                              {address.landmark
                                ? `, ${address.landmark}`
                                : ""}
                              <br />
                              {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </p>

                            <p className="mt-1 text-sm text-gray-600">
                              {address.phone}
                            </p>
                          </div>

                          <div
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-pink-600 bg-pink-600"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <CheckCircle2
                                size={14}
                                className="text-white"
                              />
                            )}
                          </div>

                        </div>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      setShowNewAddressForm(true);
                      setShowAddressList(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-pink-300 py-3 text-sm font-bold text-pink-600 hover:bg-pink-50"
                  >
                    <Plus size={17} />
                    Add New Address
                  </button>

                </div>
              )}

              {/* NEW ADDRESS FORM */}
              {showNewAddressForm && (
                <div className="mt-2">

                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">
                      {savedAddresses.length
                        ? "Add New Address"
                        : "Enter Delivery Address"}
                    </h3>

                    {savedAddresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewAddressForm(false);
                          setError("");
                        }}
                        className="text-sm font-semibold text-gray-500 hover:text-pink-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Full Name *
                      </label>
                      <input
                        name="fullName"
                        value={newAddress.fullName}
                        onChange={handleNewAddressChange}
                        placeholder="Enter full name"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Mobile Number *
                      </label>
                      <input
                        name="phone"
                        value={newAddress.phone}
                        onChange={handleNewAddressChange}
                        maxLength={10}
                        placeholder="10 digit mobile number"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        PIN Code *
                      </label>
                      <input
                        name="pincode"
                        value={newAddress.pincode}
                        onChange={handleNewAddressChange}
                        maxLength={6}
                        placeholder="6 digit PIN code"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        State *
                      </label>
                      <input
                        name="state"
                        value={newAddress.state}
                        onChange={handleNewAddressChange}
                        placeholder="Enter state"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        City *
                      </label>
                      <input
                        name="city"
                        value={newAddress.city}
                        onChange={handleNewAddressChange}
                        placeholder="Enter city"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Area / Full Address *
                      </label>
                      <input
                        name="area"
                        value={newAddress.area}
                        onChange={handleNewAddressChange}
                        placeholder="House no, street, area"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Landmark
                      </label>
                      <input
                        name="landmark"
                        value={newAddress.landmark}
                        onChange={handleNewAddressChange}
                        placeholder="Nearby landmark (optional)"
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none focus:border-pink-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                        Address Type
                      </label>
                      <select
                        name="addressType"
                        value={newAddress.addressType}
                        onChange={handleNewAddressChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm outline-none focus:border-pink-500"
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                  </div>

                  <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress((prev) => ({
                          ...prev,
                          isDefault: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 accent-pink-600"
                    />
                    Make this my default address
                  </label>

                  <button
                    type="button"
                    onClick={saveNewAddress}
                    className="mt-5 w-full rounded-lg bg-pink-600 py-3 font-bold text-white hover:bg-pink-700"
                  >
                    Save Address
                  </button>

                </div>
              )}

              {error && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-600">
                  {error}
                </p>
              )}

            </section>

            {/* PAYMENT SECTION */}
            <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-900">
                <CreditCard size={21} className="text-pink-600" />
                Payment Method
              </h2>

              <div className="space-y-3">

                <button
                  type="button"
                  onClick={() => setPayment("COD")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                    payment === "COD"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wallet size={22} className="text-pink-600" />
                    <div>
                      <p className="font-bold text-gray-900">
                        Cash on Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>

                  {payment === "COD" && (
                    <CheckCircle2 size={20} className="text-pink-600" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPayment("UPI")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                    payment === "UPI"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone size={22} className="text-pink-600" />
                    <div>
                      <p className="font-bold text-gray-900">UPI</p>
                      <p className="text-xs text-gray-500">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </div>

                  {payment === "UPI" && (
                    <CheckCircle2 size={20} className="text-pink-600" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPayment("Card")}
                  className={`flex w-full items-center justify-between rounded-xl border p-4 text-left ${
                    payment === "Card"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard size={22} className="text-pink-600" />
                    <div>
                      <p className="font-bold text-gray-900">
                        Credit / Debit Card
                      </p>
                      <p className="text-xs text-gray-500">
                        Pay using your bank card
                      </p>
                    </div>
                  </div>

                  {payment === "Card" && (
                    <CheckCircle2 size={20} className="text-pink-600" />
                  )}
                </button>

              </div>

            </section>

          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <aside className="lg:col-span-1">

            <div className="sticky top-28 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

              <h2 className="mb-5 text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="mb-5 max-h-64 space-y-4 overflow-y-auto">

                {orderItems.map((product) => {
                  const qty = Number(
                    product.qty || product.quantity || 1
                  );

                  return (
                    <div
                      key={product.id}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={product.img || product.image}
                        alt={product.name}
                        className="h-16 w-14 rounded-lg bg-gray-100 object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold text-gray-800">
                          {product.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Qty: {qty}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-bold text-gray-900">
                        {money(Number(product.price) * qty)}
                      </p>
                    </div>
                  );
                })}

              </div>

              <div className="space-y-4 border-t border-gray-200 pt-5">

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {money(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold text-green-600">
                    {delivery === 0 ? "FREE" : money(delivery)}
                  </span>
                </div>

                {isCouponValid && (
                  <div className="flex justify-between text-sm text-green-700">
                    <span className="flex items-center gap-1">
                      <Tag size={15} />
                      {coupon.code} Discount
                    </span>

                    <span className="font-bold">
                      -{money(discount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between border-t border-dashed border-gray-300 pt-5">
                  <span className="font-bold text-gray-900">
                    Total Amount
                  </span>

                  <span className="text-2xl font-extrabold text-pink-600">
                    {money(total)}
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={!selectedAddress || showNewAddressForm}
                className="mt-7 w-full rounded-lg bg-pink-600 py-3.5 font-bold text-white shadow-md shadow-pink-100 transition-all hover:bg-pink-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Place Order →
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={17} className="text-green-600" />
                Safe and secure checkout
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-lg bg-green-50 p-3">
                <Truck size={22} className="text-green-600" />

                <div>
                  <p className="text-sm font-semibold text-green-800">
                    {delivery === 0
                      ? "Free Delivery"
                      : "Delivery Charges ₹40"}
                  </p>

                  <p className="text-xs text-green-700">
                    {delivery === 0
                      ? "Enjoy free delivery on your order."
                      : "Shop for ₹499 to get free delivery."}
                  </p>
                </div>
              </div>

            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Order;