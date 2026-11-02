
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ addToCart, wishlist, toggleWish }) {
  const [sort, setSort] = useState("Recommended");
  const [filter, setFilter] = useState("All");

  const [search, setSearch] = useState(
    new URLSearchParams(window.location.search).get("search") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("search") || "");
  }, []);

  const list = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (filter === "All" || p.category === filter) &&
        `${p.name} ${p.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) =>
      sort === "Price: Low to High"
        ? a.price - b.price
        : sort === "Price: High to Low"
        ? b.price - a.price
        : 0
    );
  }, [filter, sort, search]);

  const emojis = [
    "👗",
    "👚",
    "👔",
    "🧸",
    "🏠",
    "💄",
    "💍",
    "👟",
    "👜",
    "🎧",
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="relative grid overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-rose-50 to-orange-120 shadow-sm md:grid-cols-2">
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col justify-center px-6 py-12 sm:px-10 md:px-14 md:py-20">
            <div className="mb-5 flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold tracking-widest text-pink-600 shadow-sm">
              <Sparkles size={15} />
              MEESHO MEGA SAVINGS
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Style that speaks.
              <br />
              <span className="italic text-pink-600">
                Prices that smile.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-gray-800 sm:text-lg">
              Discover the latest trends at prices you'll love.
              Shop fashion, beauty, home essentials and more!
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                🚚 Free Delivery
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm">
                💳 Cash on Delivery
              </span>
            </div>

            <a
              href="#products"
              className="mt-8 flex w-fit items-center gap-3 rounded-xl bg-pink-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-pink-700"
            >
              Shop Now
              <ArrowRight size={19} />
            </a>
          </div>

          {/* Hero Image */}
          <div className="relative flex min-h-[280px] items-center justify-center p-6 sm:min-h-[380px] md:min-h-[500px]">
            <div className="absolute h-64 w-64 rounded-full bg-pink-300/40 blur-2xl sm:h-80 sm:w-80" />

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
              alt="Fashion shopping"
              className="relative z-10 h-64 w-full max-w-lg rounded-3xl object-cover shadow-2xl sm:h-80 md:h-96"
            />

            <div className="absolute right-5 top-8 z-20 rounded-2xl bg-white px-5 py-3 shadow-lg sm:right-10 sm:top-12">
              <p className="text-xs font-bold tracking-widest text-gray-500">
                TRENDING
              </p>
              <p className="text-xl font-extrabold text-pink-600">
                NOW ↗
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:grid-cols-3">
          <div className="flex items-center gap-4 p-2">
            <div className="rounded-xl bg-pink-50 p-3 text-pink-600">
              <Truck size={27} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Free Delivery</h3>
              <p className="text-sm text-gray-500">On eligible orders</p>
            </div>
          </div>

          <div className="flex items-center gap-4 border-gray-100 p-2 sm:border-x sm:px-6">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <ShieldCheck size={27} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Secure Payments</h3>
              <p className="text-sm text-gray-500">Safe checkout</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <RotateCcw size={27} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-500">Hassle-free returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-pink-600">
            EXPLORE THE COLLECTION
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Shop by Category
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Explore our collections and find something you love.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categories.map((category, index) => (
            <Link
              to={`/category/${encodeURIComponent(category)}`}
              key={category}
              className="group flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-md"
            >
              <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-4xl transition group-hover:scale-110">
                {emojis[index % emojis.length]}
              </span>

              <b className="text-sm font-bold text-gray-800 transition group-hover:text-pink-600">
                {category}
              </b>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section
        id="products"
        className="mx-auto max-w-7xl scroll-mt-28 px-4 py-10 sm:px-6 lg:px-8"
      >
        {/* Heading and Sort */}
        <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-pink-600">
              HANDPICKED FOR YOU
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {search ? `Results for "${search}"` : "Products For You"}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Fresh finds. Fabulous prices. Every day.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <SlidersHorizontal size={18} className="text-pink-600" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer bg-transparent text-sm font-semibold text-gray-700 outline-none"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-7 flex gap-2 overflow-x-auto pb-3">
          {["All", ...categories].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                filter === category
                  ? "border-pink-600 bg-pink-600 text-white shadow-md shadow-pink-100"
                  : "border-gray-200 bg-white text-gray-600 hover:border-pink-300 hover:text-pink-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {list.length > 0 ? (
          <>
            <p className="mb-4 text-sm text-gray-500">
              Showing {list.length} products
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {list.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWish={toggleWish}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
            <span className="mb-4 text-5xl">🛍️</span>

            <h3 className="text-xl font-bold text-gray-800">
              No products found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-5 rounded-xl bg-pink-600 px-6 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
