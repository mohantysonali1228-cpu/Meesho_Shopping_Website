
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300">

      <img
        src={product.image}
        alt={product.title}
        className="w-full h-56 object-cover"
        loading="lazy"
      />

      <div className="p-4">

        <h3 className="font-semibold text-gray-800 text-lg">
          {product.title}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {product.category}
        </p>

        <div className="flex justify-between items-center mt-3">

          <span className="text-xl font-bold">
            ₹{product.price}
          </span>

          <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
            ⭐ {product.rating}
          </span>

        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          + Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;
