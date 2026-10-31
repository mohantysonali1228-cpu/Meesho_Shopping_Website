import ProductCard from "./ProductCard";

export default function ProductList({ products, onAdd }) {
  return (
    <section id="products" className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold uppercase tracking-[0.18em] text-pink-600">Fresh finds, happy prices</p><h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">Products For You</h2></div>
          <p className="text-sm text-gray-500">{products.length} products</p>
        </div>
        {products.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />)}</div> : <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-gray-500">No products found. Try another search.</div>}
      </div>
    </section>
  );
}