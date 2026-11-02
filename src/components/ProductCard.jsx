
import { Heart, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { money } from "../data/products";

function ProductCard({ product, addToCart, wishlist = [], toggleWish }) {
  const wished = wishlist.some((item) => item.id === product.id);

  const discount =
    product.old > product.price
      ? Math.round((1 - product.price / product.old) * 100)
      : 0;

  return (
    <article className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">

        <Link
          to={`/product/${product.id}`}
          className="block aspect-[3/4] overflow-hidden"
        >
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Product Tag */}
          {product.tag && (
            <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              {product.tag}
            </span>
          )}
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWish(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            wished
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-600 hover:bg-pink-600 hover:text-white"
          }`}
        >
          <Heart
            size={19}
            fill={wished ? "currentColor" : "none"}
          />
        </button>

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-4">

        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="block text-sm sm:text-base font-medium text-gray-800 line-clamp-2 min-h-10 hover:text-pink-600 transition-colors"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center flex-wrap gap-2 mt-3">

          <span className="text-xl font-bold text-gray-900">
            {money(product.price)}
          </span>

          {product.old > product.price && (
            <del className="text-sm text-gray-400">
              {money(product.old)}
            </del>
          )}

        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">

          <span className="inline-flex items-center gap-1 bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded-md">
            {product.rating}
            <Star size={12} fill="currentColor" />
          </span>

          <span className="text-xs text-gray-500">
            {product.reviews.toLocaleString("en-IN")} reviews
          </span>

        </div>

        {/* Delivery */}
        <div className="flex items-center gap-2 mt-3 text-green-700 text-xs font-medium">
          <Truck size={16} />
          <span>Free Delivery</span>
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="w-full mt-4 py-2.5 px-3 rounded-lg border-2 border-pink-600 bg-pink-600 text-white text-sm font-semibold hover:bg-white hover:text-pink-600 active:scale-95 transition-all duration-200"
        >
          Add to Cart
        </button>

      </div>
    </article>
  );
}

export default ProductCard;
