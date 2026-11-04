import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

function Home({
  addToCart,
  cart = [],
  wishlist = [],
  toggleWish,
}) {
  const location = useLocation();

  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    setSearch(params.get("search") || "");
    setFilter(params.get("category") || "all");
  }, [location.search]);

  // Search active hele homepage sections hide heba
  const isSearching = search.trim().length > 0;

  const categoryEmojis = {
    Women: "👗",
    Men: "👔",
    Kids: "🧒",
    "Kids Wear": "👶",
    Beauty: "💄",
    "Home & Kitchen": "🏠",
    Electronics: "📱",
    Footwear: "👟",
    Accessories: "👜",
    Jewellery: "💍",
    Bags: "🎒",
    Sports: "⚽",
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter !== "all") {
      result = result.filter(
        (product) =>
          String(product.category || "").toLowerCase() ===
          String(filter).toLowerCase()
      );
    }

    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      result = result.filter((product) => {
        const name = String(
          product.name || product.title || ""
        ).toLowerCase();

        const category = String(
          product.category || ""
        ).toLowerCase();

        return (
          name.includes(searchTerm) ||
          category.includes(searchTerm)
        );
      });
    }

    if (sort === "low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "name") {
      result.sort((a, b) =>
        String(a.name || a.title || "").localeCompare(
          String(b.name || b.title || "")
        )
      );
    }

    return result;
  }, [filter, search, sort]);

  const clearSearch = () => {
    setSearch("");
    setFilter("all");
    setSort("default");
    window.history.replaceState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION - Normal homepage re show heba */}
      {!isSearching && (
        <>
          <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="relative grid overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-rose-500 to-orange-400 shadow-sm md:grid-cols-2">

              <div className="relative z-10 flex flex-col justify-center px-6 py-8 sm:px-10 md:px-12 md:py-10">

                <div className="mb-4 flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
                  <Sparkles size={16} />
                  New Collection 2026
                </div>

                <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Discover Your
                  <span className="block text-yellow-200">
                    Perfect Style
                  </span>
                </h1>

                <p className="mt-3 max-w-md text-sm leading-6 text-white/90 sm:text-base">
                  Explore the latest fashion trends, amazing collections
                  and affordable products for everyone.
                </p>

                <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-white sm:text-sm">
                  <span className="rounded-full bg-white/20 px-3 py-2">
                    🚚 Free Delivery
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-2">
                    ✨ Latest Trends
                  </span>
                </div>

                <Link
                  to="/listing"
                  className="mt-6 flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-pink-600 shadow-md transition hover:bg-gray-100"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="relative flex items-center justify-center p-5 sm:p-7 md:p-8">
                <div className="absolute h-52 w-52 rounded-full bg-white/20 blur-2xl sm:h-64 sm:w-64" />

                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900"
                  alt="Fashion shopping"
                  className="relative z-10 h-52 w-full max-w-md rounded-2xl object-cover shadow-xl sm:h-64 md:h-72"
                />

                <div className="absolute bottom-8 right-8 z-20 rounded-xl bg-white px-4 py-2 shadow-lg sm:bottom-10 sm:right-10">
                  <p className="text-xs font-semibold text-gray-500">
                    Trending Now
                  </p>
                  <p className="text-sm font-bold text-pink-600">
                    2026 Collection
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* BENEFITS SECTION */}
          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="rounded-full bg-pink-100 p-3 text-pink-600">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Free Delivery
                  </h3>
                  <p className="text-sm text-gray-500">
                    On selected orders
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="rounded-full bg-green-100 p-3 text-green-600">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Secure Payment
                  </h3>
                  <p className="text-sm text-gray-500">
                    Safe and secure checkout
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="rounded-full bg-orange-100 p-3 text-orange-600">
                  <RotateCcw size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">
                    Easy Returns
                  </h3>
                  <p className="text-sm text-gray-500">
                    Hassle-free returns
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* CATEGORIES SECTION */}
          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Shop By Category
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Explore our popular categories
                </p>
              </div>

              <Link
                to="/listing"
                className="flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-700"
              >
                View All
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">

              {categories.map((category, index) => {
                const categoryName =
                  typeof category === "string"
                    ? category
                    : category.name || category.title;

                const emoji = categoryEmojis[categoryName] || "🛍️";

                return (
                  <Link
                    key={
                      (typeof category === "object" && category.id) ||
                      categoryName ||
                      index
                    }
                    to={`/?category=${encodeURIComponent(categoryName)}`}
                    className="group flex flex-col items-center rounded-xl bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-3xl transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16 sm:text-4xl">
                      {emoji}
                    </div>

                    <h3 className="text-center text-xs font-semibold text-gray-800 sm:text-sm">
                      {categoryName}
                    </h3>
                  </Link>
                );
              })}

            </div>
          </section>
        </>
      )}

      {/* PRODUCTS / SEARCH RESULTS SECTION */}
      <section
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          isSearching ? "pt-5 pb-10" : "py-6"
        }`}
      >

        {/* Search Result Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isSearching
                ? `Results for "${search}"`
                : filter !== "all"
                ? filter
                : "Popular Products"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredProducts.length} products available
            </p>
          </div>

          {isSearching ? (
            <button
              onClick={clearSearch}
              className="rounded-full border border-pink-200 px-4 py-2 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
            >
              Clear Search ✕
            </button>
          ) : (
            <Link
              to="/listing"
              className="flex items-center gap-1 text-sm font-semibold text-pink-600 hover:text-pink-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Filter and Sort */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm">

          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <SlidersHorizontal size={18} />
            Filter & Sort
          </div>

          <div className="flex flex-wrap items-center gap-3">

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-500"
            >
              <option value="all">All Categories</option>

              {categories.map((category, index) => {
                const categoryName =
                  typeof category === "string"
                    ? category
                    : category.name || category.title;

                return (
                  <option key={index} value={categoryName}>
                    {categoryName}
                  </option>
                );
              })}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-pink-500"
            >
              <option value="default">Sort By: Default</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>

          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                cart={cart}
                wishlist={wishlist}
                toggleWish={toggleWish}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-4 py-16 text-center shadow-sm">
            <div className="mb-3 text-5xl">🛍️</div>

            <h3 className="text-xl font-bold text-gray-800">
              No Products Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with another name or category.
            </p>

            <button
              onClick={clearSearch}
              className="mt-5 rounded-full bg-pink-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
            >
              Show All Products
            </button>
          </div>
        )}

      </section>
    </div>
  );
}

export default Home;