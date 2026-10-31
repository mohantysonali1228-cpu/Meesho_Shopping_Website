export default function Cart({ cart, onClose, onIncrease, onDecrease, onRemove, onCheckout }) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="fixed inset-0 z-50">
      <button aria-label="Close cart overlay" onClick={onClose} className="absolute inset-0 h-full w-full bg-black/40" />
      <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div><h2 className="text-xl font-extrabold">Shopping Cart</h2><p className="text-sm text-gray-500">{totalItems} item(s)</p></div>
          <button onClick={onClose} className="rounded-full px-3 py-2 text-xl hover:bg-gray-100" aria-label="Close cart">×</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><div className="mb-3 text-5xl">🛍️</div><h3 className="text-lg font-bold">Your cart is empty</h3><p className="mt-1 text-sm text-gray-500">Add some lovely products to get started.</p><button onClick={onClose} className="mt-5 rounded-xl bg-pink-600 px-5 py-2.5 font-bold text-white">Explore products</button></div> :
            <div className="space-y-5">{cart.map((item) => <div key={item.id} className="flex gap-3 border-b pb-5">
              <img src={item.image} alt={item.title} className="h-24 w-20 rounded-xl bg-gray-100 object-cover" onError={(e) => { e.currentTarget.src = "https://placehold.co/200x250?text=Product"; }} />
              <div className="min-w-0 flex-1"><h3 className="font-semibold">{item.title}</h3><p className="mt-1 font-extrabold">₹{item.price}</p>
                <div className="mt-3 flex items-center gap-2"><button disabled={item.quantity <= 1} onClick={() => onDecrease(item.id)} className="h-8 w-8 rounded-lg border disabled:opacity-40" aria-label={`Decrease ${item.title} quantity`}>−</button><span className="min-w-5 text-center font-bold">{item.quantity}</span><button onClick={() => onIncrease(item.id)} className="h-8 w-8 rounded-lg border" aria-label={`Increase ${item.title} quantity`}>+</button><button onClick={() => onRemove(item.id)} className="ml-auto text-sm font-semibold text-red-600 hover:underline">Remove</button></div>
              </div>
            </div>)}</div>}
        </div>
        {cart.length > 0 && <div className="border-t bg-white p-5">
          <div className="mb-2 flex justify-between text-sm text-gray-600"><span>Total items</span><span>{totalItems}</span></div>
          <div className="mb-4 flex justify-between text-lg font-extrabold"><span>Total price</span><span>₹{totalPrice.toLocaleString("en-IN")}</span></div>
          <button onClick={onCheckout} className="w-full rounded-xl bg-pink-600 py-3 font-bold text-white transition hover:bg-pink-700">Place Order · ₹{totalPrice.toLocaleString("en-IN")}</button>
          <p className="mt-2 text-center text-xs text-gray-500">Demo checkout — no payment required</p>
        </div>}
      </aside>
    </div>
  );
}