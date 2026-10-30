
import { useState } from "react";

function CheckoutForm({ cart, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      customer: { ...formData },
      items: cart.map((item) => ({ ...item })),
      totalPrice,
      orderDate: new Date().toLocaleString(),
      orderId: "ORD" + Date.now(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Checkout Details</h2>

          <button onClick={onClose} className="text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          {[
            {
              name: "fullName",
              label: "Full Name",
              placeholder: "Enter your full name",
            },
            {
              name: "mobile",
              label: "Mobile Number",
              placeholder: "10-digit mobile number",
            },
            {
              name: "address",
              label: "Delivery Address",
              placeholder: "Enter complete address",
            },
            {
              name: "pincode",
              label: "Pincode",
              placeholder: "6-digit pincode",
            },
          ].map((field) => (
            <div className="mb-4" key={field.name}>

              <label className="block font-medium mb-2">
                {field.label}
              </label>

              {field.name === "address" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full border rounded-lg p-3 outline-none focus:border-pink-500"
                />
              ) : (
                <input
                  type={field.name === "mobile" || field.name === "pincode" ? "tel" : "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  maxLength={field.name === "mobile" ? 10 : field.name === "pincode" ? 6 : undefined}
                  placeholder={field.placeholder}
                  className="w-full border rounded-lg p-3 outline-none focus:border-pink-500"
                />
              )}

              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}

            </div>
          ))}

          <div className="bg-pink-50 p-4 rounded-lg mb-5">
            <div className="flex justify-between font-bold">
              <span>Order Total</span>
              <span>₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-bold hover:bg-pink-700"
          >
            Confirm Order
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Demo checkout only. No real payment will be processed.
          </p>

        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
