
function OrderConfirmation({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">

        <div className="text-center">
          <div className="text-6xl mb-3">✅</div>

          <h2 className="text-2xl font-bold text-green-600">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-600 mt-2">
            Thank you for shopping with us!
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Order ID: {order.orderId}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mt-6">
          <h3 className="font-bold text-lg mb-3">
            Customer Information
          </h3>

          <p><b>Name:</b> {order.customer.fullName}</p>
          <p><b>Mobile:</b> {order.customer.mobile}</p>
          <p><b>Address:</b> {order.customer.address}</p>
          <p><b>Pincode:</b> {order.customer.pincode}</p>
        </div>

        <div className="mt-5">
          <h3 className="font-bold text-lg mb-3">
            Ordered Products
          </h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-3 gap-3"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-cover rounded-lg"
                />

                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-bold whitespace-nowrap">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xl font-bold mt-5">
          <span>Total Amount</span>
          <span className="text-pink-600">
            ₹{order.totalPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Order Date: {order.orderDate}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-pink-700"
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderConfirmation;
