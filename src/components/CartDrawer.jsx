
function CartDrawer({
  cart,
  isOpen,
  onClose,
  onIncrease,
  onDecrease,
  onRemove,
  onCheckout,
}) {
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:max-w-md h-full flex flex-col shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-2xl font-bold">
            My Cart ({totalItems})
          </h2>

          <button onClick={onClose} className="text-2xl">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🛒</p>
              <h3 className="text-xl font-bold">Your cart is empty</h3>
              <p className="text-gray-500 mt-2">
                Add products to continue shopping.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 border-b py-4">

                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-24 object-cover rounded-lg"
                />

                <div className="flex-1 min-w-0">

                  <h3 className="font-semibold">{item.title}</h3>

                  <p className="text-pink-600 font-bold mt-1">
                    ₹{item.price}
                  </p>

                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => onDecrease(item.id)}
                      className="border rounded px-3 py-1"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => onIncrease(item.id)}
                      className="border rounded px-3 py-1"
                    >
                      +
                    </button>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 text-sm ml-auto"
                    >
                      Remove
                    </button>

                  </div>

                </div>
              </div>
            ))
          )}

        </div>

        <div className="border-t p-5">

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between text-xl font-bold mb-5">
            <span>Total Price</span>
            <span className="text-pink-600">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={onCheckout}
            disabled={cart.length === 0}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700 disabled:bg-gray-400"
          >
            Place Order
          </button>

        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
