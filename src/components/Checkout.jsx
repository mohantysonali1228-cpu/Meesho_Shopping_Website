import { useState } from "react";

const initialForm = { fullName: "", mobile: "", address: "", pincode: "" };

export default function Checkout({ cart, onBack, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  function update(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) next.mobile = "Enter a valid 10-digit Indian mobile number.";
    if (form.address.trim().length < 8) next.address = "Enter a complete delivery address (at least 8 characters).";
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = "Pincode must contain exactly 6 digits.";
    setErrors(next);
    if (Object.keys(next).length === 0) onSubmit(form);
  }
  const fieldClass = "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100";
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 sm:p-6">
      <div className="mx-auto my-4 max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-5 sm:p-6"><div><p className="text-sm font-bold text-pink-600">ALMOST THERE</p><h2 className="mt-1 text-2xl font-extrabold">Delivery details</h2></div><button onClick={onBack} aria-label="Close checkout" className="rounded-full px-3 py-2 text-xl hover:bg-gray-100">×</button></div>
        <form onSubmit={submit} noValidate className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <label className="sm:col-span-2 text-sm font-semibold">Full Name<input name="fullName" value={form.fullName} onChange={update} className={fieldClass} placeholder="Enter your full name" autoComplete="name" />{errors.fullName && <span className="mt-1 block text-xs text-red-600">{errors.fullName}</span>}</label>
          <label className="text-sm font-semibold">Mobile Number<input name="mobile" value={form.mobile} onChange={update} className={fieldClass} placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} autoComplete="tel" />{errors.mobile && <span className="mt-1 block text-xs text-red-600">{errors.mobile}</span>}</label>
          <label className="text-sm font-semibold">Pincode<input name="pincode" value={form.pincode} onChange={update} className={fieldClass} placeholder="6-digit pincode" inputMode="numeric" maxLength={6} autoComplete="postal-code" />{errors.pincode && <span className="mt-1 block text-xs text-red-600">{errors.pincode}</span>}</label>
          <label className="sm:col-span-2 text-sm font-semibold">Delivery Address<textarea name="address" value={form.address} onChange={update} className={`${fieldClass} min-h-24 resize-y`} placeholder="House no., street, area, city, state" autoComplete="street-address" />{errors.address && <span className="mt-1 block text-xs text-red-600">{errors.address}</span>}</label>
          <div className="sm:col-span-2 rounded-xl bg-pink-50 p-4"><div className="flex justify-between text-sm text-gray-600"><span>Items in order</span><span>{cart.reduce((s, i) => s + i.quantity, 0)}</span></div><div className="mt-2 flex justify-between text-lg font-extrabold"><span>Order total</span><span>₹{total.toLocaleString("en-IN")}</span></div></div>
          <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end"><button type="button" onClick={onBack} className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50">Back to cart</button><button type="submit" className="rounded-xl bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-700">Confirm Demo Order</button></div>
          <p className="sm:col-span-2 text-center text-xs text-gray-500">This is a simulated order. No actual purchase or payment will be processed.</p>
        </form>
      </div>
    </div>
  );
}