"use client";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";

const categoryEmoji = {
  Apparel: "👕",
  Footwear: "👟",
  Electronics: "⌚",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
        <span className="text-7xl">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">You haven’t added anything to your cart yet!</p>
        <Link
          href="/"
          className="mt-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Cart</h1>
          <p className="text-gray-400 text-sm mt-1">{totalCount} items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-red-400 text-sm hover:text-red-600 transition flex items-center gap-1"
        >
          🗑️ Clear cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Items list */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex gap-4 items-center"
            >
              {/* Image */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                {categoryEmoji[item.category] ?? "📦"}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{item.category}</p>

                {/* Quantity control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.id)
                        : updateQuantity(item.id, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-400 hover:text-blue-600 transition font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-bold text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-blue-400 hover:text-blue-600 transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price + remove */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <span className="font-extrabold text-blue-700 text-base">
                  {(item.price * item.quantity).toLocaleString("fa-IR")}
                  <span className="text-gray-400 text-xs font-normal mr-1">Toman</span>
                </span>
                {item.quantity > 1 && (
                  <span className="text-gray-300 text-xs">
                    Each {item.price.toLocaleString("fa-IR")}
                  </span>
                )}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-400 transition text-lg"
                  aria-label="حذف"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}

          <Link
            href="/"
            className="text-blue-600 text-sm hover:underline flex items-center gap-1 mt-2"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary box */}
        <div className="lg:w-80">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-bold text-gray-800 mb-5">Order summary</h2>

            <div className="flex flex-col gap-3 text-sm mb-5">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({totalCount} items)</span>
                <span>{total.toLocaleString("fa-IR")} Toman</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className={total >= 500000 ? "text-green-500 font-medium" : ""}>
                  {total >= 500000 ? "Free 🎉" : "30,000 Toman"}
                </span>
              </div>
              {total < 500000 && (
                <p className="text-xs text-blue-400 bg-blue-50 rounded-lg px-3 py-2">
                  For free shipping, add{" "}
                  <strong>
                    {(500000 - total).toLocaleString("fa-IR")} Toman
                  </strong>{" "}
                  more
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-5 flex justify-between font-bold text-gray-800">
              <span>Total</span>
              <span className="text-blue-700 text-lg">
                {(total >= 500000 ? total : total + 30000).toLocaleString("fa-IR")} Toman
              </span>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all text-base">
              Checkout
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <span>🔒</span>
              <span>Secure payment with a trusted gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}