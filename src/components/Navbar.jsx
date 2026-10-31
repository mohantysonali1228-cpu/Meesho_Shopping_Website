export default function Navbar({ cartCount, onCartClick, search, setSearch }) {
  return (
    <header className="sticky top-0 z-30 border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#" className="text-3xl font-black tracking-tight text-pink-600" aria-label="Meesho Store home">meesho<span className="text-purple-600">.</span></a>
        <div className="order-3 w-full sm:order-2 sm:w-auto sm:flex-1 sm:max-w-md">
          <label className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-pink-400">
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full bg-transparent text-sm outline-none" />
          </label>
        </div>
        <button onClick={onCartClick} className="order-2 rounded-xl bg-pink-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-700 sm:order-3">
          🛍️ Cart <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5">{cartCount}</span>
        </button>
      </div>
      <div className="hidden border-t border-gray-100 sm:block">
        <div className="mx-auto flex max-w-7xl gap-7 px-6 py-2.5 text-sm text-gray-600 lg:px-8">
          <span>Women Ethnic</span><span>Women Western</span><span>Men</span><span>Kids</span><span>Home & Kitchen</span><span>Beauty</span><span>Accessories</span>
        </div>
      </div>
    </header>
  );
}