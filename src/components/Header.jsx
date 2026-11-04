import { useState } from "react";
import {
  Search,
  UserRound,
  ShoppingCart,
  Heart,
  Menu,
  X,
} from "lucide-react";

import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { categories } from "../data/products";

function Header({ cart = [], wishlist = [], user }) {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Hide only category navigation on these pages
  const hideCategories = [
    "/profile",
    "/login",
    "/register",
  ].includes(location.pathname);

  const cartCount = cart.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );

  const wishlistCount = wishlist.length;

  const submit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-pink-600"
        : "text-gray-700 hover:text-pink-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">

      {/* Main Navbar - Always Visible */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        <div className="h-20 flex items-center justify-between gap-5">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-pink-600 shrink-0"
          >
            meesho<span className="text-purple-600">.</span>
          </Link>

          {/* Desktop Search */}
          <form
            onSubmit={submit}
            className="hidden md:flex flex-1 max-w-xl items-center gap-3 px-4 h-12 border border-gray-300 rounded-lg bg-gray-50 focus-within:border-pink-500 focus-within:bg-white transition-all"
          >
            <Search size={21} className="text-gray-500 shrink-0" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try Saree, Kurti or Search Product"
              className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-gray-500 hover:text-pink-600"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </form>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">

            <NavLink to="/profile" className={navLinkClass}>
              <UserRound size={22} />
              <span>{user?.name?.split(" ")[0] || "Profile"}</span>
            </NavLink>

            <NavLink to="/wishlist" className={navLinkClass}>
              <span className="relative">
                <Heart size={22} />

                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                    {wishlistCount}
                  </span>
                )}
              </span>
              <span>Wishlist</span>
            </NavLink>

            <NavLink to="/cart" className={navLinkClass}>
              <span className="relative">
                <ShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-[10px] rounded-full min-w-4 h-4 flex items-center justify-center px-1">
                    {cartCount}
                  </span>
                )}
              </span>
              <span>Cart</span>
            </NavLink>

          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

        {/* Mobile Search */}
        <form
          onSubmit={submit}
          className="md:hidden flex items-center gap-3 px-4 h-11 mb-4 border border-gray-300 rounded-lg bg-gray-50 focus-within:border-pink-500"
        >
          <Search size={19} className="text-gray-500" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent outline-none text-sm"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </form>

      </div>

      {/* Desktop Category Navigation */}
      {!hideCategories && (
        <nav className="hidden lg:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-5 overflow-x-auto">

            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${encodeURIComponent(category)}`}
                className="py-4 text-sm text-gray-700 font-medium whitespace-nowrap hover:text-pink-600 hover:border-b-2 hover:border-pink-600 transition-all"
              >
                {category}
              </Link>
            ))}

          </div>
        </nav>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">

          <div className="px-5 py-5 space-y-5">

            <NavLink
              to="/profile"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              <UserRound size={21} />
              {user?.name?.split(" ")[0] || "Profile"}
            </NavLink>

            <NavLink
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              <Heart size={21} />
              Wishlist ({wishlistCount})
            </NavLink>

            <NavLink
              to="/cart"
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              <ShoppingCart size={21} />
              Cart ({cartCount})
            </NavLink>

            {/* Mobile Categories - Hidden on Profile/Login/Register */}
            {!hideCategories && (
              <div className="border-t border-gray-200 pt-4">

                <h3 className="font-bold text-gray-900 mb-4">
                  Shop By Category
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/category/${encodeURIComponent(category)}`}
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
                    >
                      {category}
                    </Link>
                  ))}

                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </header>
  );
}

export default Header;