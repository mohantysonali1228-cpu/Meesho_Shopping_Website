
import ProductCard from "./ProductCard";

function ProductList({ products, onAddToCart }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Products For You
        </h2>

        <span className="text-gray-500">
          {products.length} Products
        </span>
      </div>

      {products.length === 0 ? (
        <p className="text-center py-16 text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}

        </div>
      )}

    </section>
  );
}

export default ProductList;
