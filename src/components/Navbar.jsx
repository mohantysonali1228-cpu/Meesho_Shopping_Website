
function Navbar({ cartCount, onCartClick, search, setSearch }) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">

        <a href="#" className="text-3xl font-bold text-pink-600">
          meesho<span className="text-gray-800">.</span>
        </a>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-3 flex-1 min-w-40 max-w-xl outline-none focus:border-pink-500"
        />

        <button
          onClick={onCartClick}
          className="relative bg-pink-600 text-white px-5 py-3 rounded-lg hover:bg-pink-700"
        >
          🛒 Cart
          <span className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold">
            {cartCount}
          </span>
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
