import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileDown,
  MapPin,
  CreditCard,
} from "lucide-react";

function MyOrder() {
  const [orders] = useState(() => {
    try {
      const currentUser = JSON.parse(
        localStorage.getItem("meesho_user") || "{}"
      );

      if (!currentUser.email) {
        return [];
      }

      const userOrdersKey = `myOrders_${currentUser.email
        .trim()
        .toLowerCase()}`;

      const userOrders = JSON.parse(
        localStorage.getItem(userOrdersKey) || "[]"
      );

      return Array.isArray(userOrders) ? userOrders : [];
    } catch {
      return [];
    }
  });

  const [expandedOrder, setExpandedOrder] = useState(null);

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  const getQty = (item) =>
    Number(item.quantity || item.qty || 1);

  const getOrderTotal = (order) =>
    Number(
      order.total ??
      (order.items || []).reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * getQty(item),
        0
      )
    );

  // Expand / Collapse Order
  const toggleOrder = (id) => {
    setExpandedOrder((previous) =>
      previous === id ? null : id
    );
  };

  // Download Invoice
  const downloadInvoice = (order) => {
    const address = order.address || {};

    const escapeHTML = (value) =>
      String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char]);

    const productsHTML = (order.items || [])
      .map((item, index) => {
        const qty = getQty(item);
        const price = Number(item.price || 0);

        return `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeHTML(item.name || "Product")}</td>
            <td>${qty}</td>
            <td>₹${formatPrice(price)}</td>
            <td>₹${formatPrice(price * qty)}</td>
          </tr>
        `;
      })
      .join("");

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice - ${escapeHTML(order.orderId)}</title>
        <style>
          * { box-sizing: border-box; }
          body {
            font-family: Arial, sans-serif;
            padding: 35px;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #e91e63;
            padding-bottom: 20px;
          }
          .brand {
            font-size: 30px;
            font-weight: bold;
            color: #e91e63;
          }
          h2 { margin-top: 30px; }
          .info {
            display: flex;
            justify-content: space-between;
            gap: 30px;
            margin: 25px 0;
          }
          .info div { line-height: 1.8; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 25px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
          }
          th {
            background: #fce4ec;
          }
          .total {
            text-align: right;
            margin-top: 25px;
            font-size: 20px;
            font-weight: bold;
            color: #e91e63;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #777;
            border-top: 1px solid #ddd;
            padding-top: 20px;
          }
          @media print {
            body { padding: 15px; }
          }
        </style>
      </head>
      <body>

        <div class="header">
          <div>
            <div class="brand">Meesho</div>
            <p>Shopping Invoice</p>
          </div>
          <div>
            <h2>INVOICE</h2>
            <p>Order ID: ${escapeHTML(order.orderId)}</p>
            <p>Date: ${escapeHTML(order.date)}</p>
          </div>
        </div>

        <div class="info">
          <div>
            <h3>Delivery Address</h3>
            <b>${escapeHTML(address.name)}</b><br/>
            ${escapeHTML(address.fullAddress)}<br/>
            ${escapeHTML(address.city)}, ${escapeHTML(address.state)}<br/>
            PIN: ${escapeHTML(address.pincode)}<br/>
            Mobile: ${escapeHTML(address.phone)}
          </div>

          <div>
            <h3>Payment Information</h3>
            Payment: ${escapeHTML(order.payment || "COD")}<br/>
            Order ID: ${escapeHTML(order.orderId)}
          </div>
        </div>

        <h3>Order Items</h3>

        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${productsHTML}
          </tbody>
        </table>

        <div class="total">
          Total Amount: ₹${formatPrice(getOrderTotal(order))}
        </div>

        <div class="footer">
          Thank you for shopping with Meesho!
        </div>

      </body>
      </html>
    `;

    const invoiceWindow = window.open("", "_blank");

    if (!invoiceWindow) {
      alert("Please allow pop-ups to download your invoice.");
      return;
    }

    invoiceWindow.document.open();
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();

    invoiceWindow.onload = () => {
      invoiceWindow.focus();
      invoiceWindow.print();
    };
  };

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl">

        {/* HEADER */}
        <div className="mb-5">
          <Link
            to="/profile"
            className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-pink-600"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">
                My Orders
              </h1>
              <p className="mt-1 text-xs text-gray-500">
                Your complete order history
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-pink-50 px-3 py-2 text-pink-600">
              <Package size={20} />
              <span className="text-sm font-extrabold">
                {orders.length}
              </span>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="rounded-2xl bg-white px-5 py-14 text-center shadow-sm">
            <ShoppingBag
              size={48}
              className="mx-auto mb-4 text-pink-500"
            />

            <h2 className="text-xl font-extrabold text-gray-900">
              No Orders Yet!
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your orders will appear here after shopping.
            </p>

            <Link
              to="/"
              className="mt-5 inline-block rounded-lg bg-pink-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-pink-700"
            >
              Start Shopping
            </Link>
          </div>
        ) : (

          /* ORDER HISTORY */
          <div className="space-y-3">

            {orders.map((order, index) => {
              const orderKey = order.orderId || index;
              const isExpanded = expandedOrder === orderKey;
              const items = order.items || [];
              const firstItem = items[0];

              return (
                <section
                  key={orderKey}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition"
                >

                  {/* COMPACT ORDER HEADER */}
                  <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-3 py-2.5 sm:px-4">

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-gray-800">
                        Order ID: {order.orderId || "N/A"}
                      </p>

                      <p className="mt-1 flex items-center gap-1 text-[11px] text-gray-500">
                        <CalendarDays size={12} />
                        {order.date || "Date unavailable"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-extrabold text-gray-900">
                        ₹{formatPrice(getOrderTotal(order))}
                      </p>

                      <span className="text-[10px] font-semibold text-green-600">
                        Order Placed
                      </span>
                    </div>
                  </div>

                  {/* CLICKABLE PRODUCT BAR */}
                  <button
                    type="button"
                    onClick={() => toggleOrder(orderKey)}
                    aria-expanded={isExpanded}
                    className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-pink-50/50 sm:px-4"
                  >

                    {firstItem ? (
                      <img
                        src={firstItem.img || firstItem.image}
                        alt={firstItem.name || "Product"}
                        className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                        <Package size={25} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-gray-800">
                        {firstItem?.name || "Order Products"}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {items.length} {items.length === 1 ? "Product" : "Products"}
                        {items.length > 1 && " in this order"}
                      </p>

                      <p className="mt-1 text-[11px] font-semibold text-pink-600">
                        {isExpanded ? "Close order details" : "Click to view order details"}
                      </p>
                    </div>

                    <div className="shrink-0 text-gray-400">
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>

                  </button>

                  {/* EXPANDED DETAILS */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50/70 p-4">

                      {/* PRODUCTS */}
                      <h3 className="mb-3 text-sm font-extrabold text-gray-900">
                        Order Items
                      </h3>

                      <div className="space-y-3">
                        {items.map((item, i) => (
                          <div
                            key={item.id || i}
                            className="flex items-center gap-3 rounded-lg bg-white p-2.5"
                          >
                            <img
                              src={item.img || item.image}
                              alt={item.name || "Product"}
                              className="h-14 w-14 shrink-0 rounded-lg bg-gray-100 object-cover"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-gray-800">
                                {item.name || "Product"}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                Qty: {getQty(item)}
                              </p>
                            </div>

                            <p className="shrink-0 text-sm font-bold text-gray-900">
                              ₹{formatPrice(Number(item.price || 0) * getQty(item))}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* DELIVERY ADDRESS */}
                      {order.address && (
                        <div className="mt-4 rounded-lg bg-white p-3">
                          <h3 className="mb-2 flex items-center gap-2 text-xs font-extrabold text-gray-900">
                            <MapPin size={16} className="text-pink-600" />
                            Delivery Address
                          </h3>

                          <p className="text-xs font-semibold text-gray-800">
                            {order.address.name}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-600">
                            {order.address.fullAddress},
                            {" "}{order.address.city},
                            {" "}{order.address.state} - {order.address.pincode}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Mobile: {order.address.phone}
                          </p>
                        </div>
                      )}

                      {/* PAYMENT AND TOTAL */}
                      <div className="mt-3 flex items-center justify-between rounded-lg bg-white p-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                          <CreditCard size={16} className="text-pink-600" />
                          {order.payment || "COD"}
                        </div>

                        <div className="text-right">
                          <p className="text-[11px] text-gray-500">
                            Total Amount
                          </p>
                          <p className="text-base font-extrabold text-pink-600">
                            ₹{formatPrice(getOrderTotal(order))}
                          </p>
                        </div>
                      </div>

                      {/* DOWNLOAD INVOICE */}
                      <button
                        type="button"
                        onClick={() => downloadInvoice(order)}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-pink-600 py-3 text-sm font-bold text-white transition hover:bg-pink-700"
                      >
                        <FileDown size={18} />
                        Download Invoice (PDF)
                      </button>

                    </div>
                  )}

                </section>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}

export default MyOrder;