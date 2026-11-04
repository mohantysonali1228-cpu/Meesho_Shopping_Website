import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  UserRound,
  ShoppingCart,
  Heart,
  MapPin,
  LogOut,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

function Profile({
  user,
  setUser,
  cart = [],
  setCart,
  wishlist = [],
  handleLogout: appLogout,
}) {
  const [addresses, setAddresses] = useState([]);
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const emptyAddress = {
    fullName: "",
    phone: "",
    pincode: "",
    state: "",
    city: "",
    area: "",
    landmark: "",
    addressType: "Home",
  };

  const [formData, setFormData] = useState(emptyAddress);

  const addressKey = user?.email
    ? `addressBook_${user.email}`
    : "addressBook_guest";

  // LOAD USER ADDRESSES
  useEffect(() => {
    if (!user) {
      setAddresses([]);
      return;
    }

    try {
      const savedAddresses = JSON.parse(
        localStorage.getItem(addressKey) || "[]",
      );

      setAddresses(Array.isArray(savedAddresses) ? savedAddresses : []);
    } catch {
      setAddresses([]);
    }
  }, [addressKey, user]);

  // SAVE ADDRESSES
  const saveAddresses = (updatedAddresses) => {
    setAddresses(updatedAddresses);
    localStorage.setItem(addressKey, JSON.stringify(updatedAddresses));
  };

  // INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ADD ADDRESS
  const handleAddNew = () => {
    setEditId(null);

    setFormData({
      ...emptyAddress,
      fullName: user.name || "",
    });

    setShowForm(true);
  };

  // EDIT ADDRESS
  const handleEdit = (address) => {
    setEditId(address.id);

    setFormData({
      ...emptyAddress,
      ...address,
    });

    setShowForm(true);
  };

  // SAVE ADDRESS
  const handleSaveAddress = (e) => {
    e.preventDefault();

    const addressData = {
      ...formData,
      id: editId || Date.now(),
      isDefault: editId
        ? addresses.find((a) => a.id === editId)?.isDefault || false
        : addresses.length === 0,
    };

    let updatedAddresses;

    if (editId) {
      updatedAddresses = addresses.map((address) =>
        address.id === editId ? addressData : address,
      );
    } else {
      updatedAddresses = [...addresses, addressData];
    }

    saveAddresses(updatedAddresses);

    setShowForm(false);
    setEditId(null);
    setFormData(emptyAddress);
  };

  // REMOVE ADDRESS
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this address?")) {
      return;
    }

    let updatedAddresses = addresses.filter((address) => address.id !== id);

    if (
      updatedAddresses.length > 0 &&
      !updatedAddresses.some((address) => address.isDefault)
    ) {
      updatedAddresses = updatedAddresses.map((address, index) => ({
        ...address,
        isDefault: index === 0,
      }));
    }

    saveAddresses(updatedAddresses);
  };

  // SET DEFAULT ADDRESS
  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    saveAddresses(updatedAddresses);
  };

  // CLOSE FORM
  const handleCloseForm = () => {
    setShowForm(false);
    setEditId(null);
    setFormData(emptyAddress);
  };

  // LOGOUT
  const handleProfileLogout = () => {
    if (appLogout) {
      appLogout();
    } else {
      setCart?.([]);
      localStorage.removeItem("meesho_cart");
      setUser(null);
    }
  };

  // LOGIN REQUIRED
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full shadow-sm">
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Meesho_logo.png"
              alt="Meesho Logo"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900">
            Welcome to Meesho!
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please login to view your profile, manage your orders, wishlist and
            account details.
          </p>

          <Link
            to="/login"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-pink-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-pink-100 transition hover:-translate-y-0.5 hover:bg-pink-700"
          >
            <UserRound size={19} />
            Login / Sign up
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/"
            className="mt-5 inline-block text-sm font-semibold text-gray-500 transition hover:text-pink-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* PAGE HEADING */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-pink-600">
            MY ACCOUNT
          </p>

          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Hello, {user.name}!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Manage your account and shopping activities.
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 to-rose-500 p-6 text-white shadow-lg sm:p-8">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/40 bg-white text-3xl font-extrabold text-pink-600 shadow-md">
              {initial}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold">{user.name}</h2>
                <CheckCircle2 size={21} />
              </div>

              <p className="mt-1 break-all text-sm text-pink-100">
                {user.email}
              </p>

              <p className="mt-3 flex items-center gap-2 text-xs font-medium text-pink-100">
                <ShieldCheck size={15} />
                Your account
              </p>
            </div>

            <div className="w-fit rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              <span className="flex items-center gap-2">
                <UserRound size={17} />
                My Profile
              </span>
            </div>
          </div>
        </section>

        {/* ACCOUNT STATISTICS */}
        <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cart Items</p>
                <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {cart.length}
                </h3>
              </div>

              <div className="rounded-xl bg-pink-50 p-3 text-pink-600">
                <ShoppingCart size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Wishlist Items
                </p>
                <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {wishlist.length}
                </h3>
              </div>

              <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                <Heart size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Account Status
                </p>
                <h3 className="mt-2 text-xl font-extrabold text-green-600">
                  Active
                </h3>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <CheckCircle2 size={25} />
              </div>
            </div>
          </div>
        </section>

        {/* ACCOUNT SETTINGS */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-extrabold text-gray-900">
            Account Settings
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* MY ORDERS */}
            <Link
              to="/my-orders"
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition hover:bg-pink-50/50 sm:p-6"
            >
              <div className="rounded-xl bg-pink-50 p-3 text-pink-600">
                <Package size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">My Orders</h3>
                <p className="mt-1 text-sm text-gray-500">
                  View your order history and details
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-pink-600"
              />
            </Link>

            {/* MY WISHLIST */}
            <Link
              to="/wishlist"
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition hover:bg-pink-50/50 sm:p-6"
            >
              <div className="rounded-xl bg-rose-50 p-3 text-rose-600">
                <Heart size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">My Wishlist</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {wishlist.length} saved products
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 group-hover:text-pink-600"
              />
            </Link>

            {/* ADDRESS BOOK */}
            <button
              type="button"
              onClick={() => setShowAddressBook((prev) => !prev)}
              className="group flex w-full items-center gap-4 p-5 text-left transition hover:bg-pink-50/50 sm:p-6"
            >
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <MapPin size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">Address Book</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {addresses.length} saved address(es)
                </p>
              </div>

              {showAddressBook ? (
                <ChevronUp size={20} className="text-pink-600" />
              ) : (
                <ChevronDown
                  size={20}
                  className="text-gray-400 group-hover:text-pink-600"
                />
              )}
            </button>

            {/* ADDRESS BOOK CONTENT */}
            {showAddressBook && (
              <div className="border-t border-gray-100 p-5 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-gray-900">
                      Saved Addresses
                    </h2>
                    <p className="text-sm text-gray-500">
                      Add, edit or manage your delivery addresses.
                    </p>
                  </div>

                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-pink-700"
                  >
                    <Plus size={18} />
                    Add New
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-300 py-8 text-center">
                    <MapPin size={32} className="mx-auto text-gray-300" />
                    <p className="mt-3 font-semibold text-gray-700">
                      No saved addresses yet
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Add your first delivery address.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`rounded-xl border p-4 ${
                          address.isDefault
                            ? "border-pink-300 bg-pink-50/40"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                            {address.addressType}
                          </span>

                          {address.isDefault && (
                            <span className="flex items-center gap-1 text-xs font-bold text-pink-600">
                              <Star size={13} fill="currentColor" />
                              Default
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 font-bold text-gray-900">
                          {address.fullName}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {address.area}, {address.city}, {address.state} -{" "}
                          {address.pincode}
                          {address.landmark && `, Near ${address.landmark}`}
                        </p>

                        <p className="mt-2 text-sm font-semibold text-gray-700">
                          Phone: {address.phone}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-gray-200 pt-3">
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefault(address.id)}
                              className="text-xs font-bold text-pink-600 hover:underline"
                            >
                              Set as Default
                            </button>
                          )}

                          <button
                            onClick={() => handleEdit(address)}
                            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                          >
                            <Pencil size={13} />
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(address.id)}
                            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
                          >
                            <Trash2 size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ADDRESS FORM MODAL */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-gray-900">
                  {editId ? "Edit Address" : "Add New Address"}
                </h2>

                <button
                  onClick={handleCloseForm}
                  className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Mobile Number
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    maxLength={10}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                    placeholder="10 digit mobile number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      PIN Code
                    </label>
                    <input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      maxLength={6}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                      placeholder="6 digit PIN"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      State
                    </label>
                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    City
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                    placeholder="City"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Area / House No. / Street
                  </label>
                  <textarea
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                    placeholder="House number, street, area"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">
                    Landmark (Optional)
                  </label>
                  <input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-pink-500"
                    placeholder="Nearby landmark"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Address Type
                  </label>

                  <div className="flex gap-3">
                    {["Home", "Work", "Other"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            addressType: type,
                          }))
                        }
                        className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                          formData.addressType === type
                            ? "border-pink-600 bg-pink-50 text-pink-600"
                            : "border-gray-300 text-gray-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-pink-600 py-3 font-bold text-white hover:bg-pink-700"
                  >
                    {editId ? "Update Address" : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LOGOUT BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleProfileLogout}
            className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-white px-7 py-3 font-bold text-red-500 transition hover:border-red-500 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}

export default Profile;