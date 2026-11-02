
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
} from "lucide-react";

function Profile({ user, setUser, cart = [], wishlist = [] }) {
  // LOGIN REQUIRED
  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-pink-50">
            <UserRound size={45} className="text-pink-600" />
          </div>

          <h2 className="text-2xl font-extrabold text-gray-900">
            Welcome to Meesho!
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Please login to view your profile, manage your orders,
            wishlist and account details.
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

  const handleLogout = () => {
    setUser(null);
  };

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
            {/* AVATAR */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/40 bg-white text-3xl font-extrabold text-pink-600 shadow-md">
              {initial}
            </div>

            {/* USER INFORMATION */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold">
                  {user.name}
                </h2>

                <CheckCircle2 size={21} className="text-white" />
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

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Cart Items
                </p>

                <h3 className="mt-2 text-3xl font-extrabold text-gray-900">
                  {cart.length}
                </h3>
              </div>

              <div className="rounded-xl bg-pink-50 p-3 text-pink-600">
                <ShoppingCart size={25} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
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

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
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

        {/* ACCOUNT OPTIONS */}
        <section className="mt-8">
          <h2 className="mb-5 text-xl font-extrabold text-gray-900">
            Account Settings
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* MY CART */}
            <Link
              to="/cart"
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition hover:bg-pink-50/50 sm:p-6"
            >
              <div className="rounded-xl bg-pink-50 p-3 text-pink-600 transition group-hover:bg-pink-100">
                <ShoppingCart size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  My Cart
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {cart.length} products in your cart
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-pink-600"
              />
            </Link>

            {/* MY WISHLIST */}
            <Link
              to="/wishlist"
              className="group flex items-center gap-4 border-b border-gray-100 p-5 transition hover:bg-pink-50/50 sm:p-6"
            >
              <div className="rounded-xl bg-rose-50 p-3 text-rose-600 transition group-hover:bg-rose-100">
                <Heart size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  My Wishlist
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {wishlist.length} saved products
                </p>
              </div>

              <ArrowRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-pink-600"
              />
            </Link>

            {/* ADDRESS BOOK */}
            <div className="flex items-center gap-4 p-5 sm:p-6">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <MapPin size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-gray-900">
                  Address Book
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Address details can be added at checkout
                </p>
              </div>

              <Package size={20} className="text-gray-400" />
            </div>
          </div>
        </section>

        {/* LOGOUT BUTTON */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
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
