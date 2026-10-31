export default function ProductCard({ product, onAdd }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden bg-pink-50">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
          onError={(e) => { e.currentTarget.src = "https://placehold.co/600x700/fce7f3/9d174d?text=Product+Image"; }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-pink-700 shadow-sm">Popular</span>
      </div>
      <div className="p-3.5 sm:p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">{product.category}</p>
        <h3 className="min-h-10 line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">{product.title}</h3>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold text-gray-900">₹{product.price}</p>
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800">★ {product.rating}</span>
        </div>
        <p className="mt-1 text-xs text-gray-500">Free delivery on eligible orders</p>
        <button onClick={() => onAdd(product)} className="mt-4 w-full rounded-xl border border-pink-600 py-2.5 text-sm font-bold text-pink-600 transition hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-300">
          + Add to Cart
        </button>
      </div>
    </article>
  );
}