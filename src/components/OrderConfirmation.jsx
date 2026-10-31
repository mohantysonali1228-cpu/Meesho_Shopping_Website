export default function OrderConfirmation({ order, onContinue }) {
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/40 p-3 sm:p-6">
      <section role="dialog" aria-modal="true" aria-labelledby="order-title" className="mx-auto my-5 max-w-2xl rounded-2xl bg-white p-5 shadow-2xl sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">✓</div>
        <h2 id="order-title" className="mt-4 text-center text-2xl font-extrabold text-gray-900">Order Confirmed!</h2>
        <p className="mt-2 text-center font-semibold text-pink-600">Thank you for shopping with us!</p>
        <p className="mt-2 text-center text-sm text-gray-500">Your demo order has been placed successfully.</p>
        <div className="mt-6 rounded-xl border p-4"><h3 className="mb-3 font-bold">Order summary</h3>
          {order.items.map((item) => <div key={item.id} className="flex justify-between gap-3 border-b py-2 text-sm last:border-0"><span>{item.title} × {item.quantity}</span><span className="shrink-0 font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span></div>)}
          <div className="mt-3 flex justify-between border-t pt-3 text-lg font-extrabold"><span>Total order cost</span><span>₹{total.toLocaleString("en-IN")}</span></div>
        </div>
        <div className="mt-4 rounded-xl bg-gray-50 p-4"><h3 className="mb-2 font-bold">Delivery information</h3><p className="text-sm">{order.customer.fullName}</p><p className="text-sm text-gray-600">{order.customer.mobile}</p><p className="mt-1 text-sm text-gray-600">{order.customer.address}, {order.customer.pincode}</p></div>
        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-center text-xs text-amber-800">Note: This is a simulated order. No actual purchase or payment will be processed.</p>
        <button onClick={onContinue} className="mt-5 w-full rounded-xl bg-pink-600 py-3 font-bold text-white transition hover:bg-pink-700">Continue Shopping</button>
      </section>
    </div>
  );
}