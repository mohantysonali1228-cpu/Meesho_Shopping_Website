
import { useState } from "react";

export default function Navbar({
  cartCount,
  onCartClick,
  search,
  setSearch,
  onProfileClick,
  user,
  onLogout,
}) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur">

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-black tracking-tight text-pink-600"
        >
          meesho<span className="text-purple-600">.</span>
        </a>

        {/* Search */}
        <div className="order-3 w-full sm:order-2 sm:w-auto sm:max-w-md sm:flex-1">
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 transition focus-within:border-pink-400">
            <span className="text-xl">⌕</span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        {/* Right Menu */}
        <div className="order-2 flex items-center gap-3 sm:order-3">

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700"
          >
            🛍️ Cart
            <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5">
              {cartCount}
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">

            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 transition hover:border-pink-400 hover:bg-pink-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-lg">
                👤
              </div>

              <span className="hidden text-sm font-semibold text-gray-700 sm:block">
                {user?.name || "Profile"}
              </span>

              <span className="text-xs">▼</span>
            </button>

            {/* Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">

                <div className="border-b bg-pink-50 px-4 py-4">
                  <p className="font-bold text-gray-800">
                    {user?.name || "Welcome to Meesho"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {user?.email || "Login to access your account"}
                  </p>
                </div>

                <div className="p-2">

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      onProfileClick?.("profile");
                    }}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-pink-50"
                  >
                    👤 My Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      onProfileClick?.("orders");
                    }}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-pink-50"
                  >
                    📦 My Orders
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      onProfileClick?.("wishlist");
                    }}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-gray-700 hover:bg-pink-50"
                  >
                    ❤️ Wishlist
                  </button>

                  <hr className="my-2" />

                  {user ? (
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        onLogout?.();
                      }}
                      className="w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      🚪 Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        onProfileClick?.("login");
                      }}
                      className="w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-pink-600 hover:bg-pink-50"
                    >
                      🔐 Login / Register
                    </button>
                  )}

                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="hidden border-t border-gray-100 sm:block">
        <div className="mx-auto flex max-w-7xl gap-7 overflow-x-auto px-6 py-3 text-sm text-gray-600 lg:px-8">
          {[
            "Women Ethnic",
            "Women Western",
            "Men",
            "Kids",
            "Home & Kitchen",
            "Beauty",
            "Accessories",
          ].map((category) => (
            <button
              key={category}
              className="whitespace-nowrap transition hover:text-pink-600"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
