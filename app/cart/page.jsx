"use client";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categoryEmoji = {
  Apparel: "👕",
  Footwear: "👟",
  Electronics: "⌚",
};

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    notes: "",
  });

  const router = useRouter();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = total >= 500000 ? 0 : 30000;
  const grandTotal = total + shipping;

  const canSubmit =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.city.trim() &&
    form.address.trim();

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleCheckout = () => {
    if (!canSubmit) return;
    router.push("/checkout");
  };

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
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-2">{totalCount} items selected</p>
        </div>
        <button
          onClick={clearCart}
          className="self-start rounded-2xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm flex flex-col gap-4 sm:flex-row"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-3xl bg-slate-100">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl">
                    {categoryEmoji[item.category] ?? "📦"}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition text-xl"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {item.description || "Product details will appear here."}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-2">
                    <button
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-lg text-gray-600 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-lg text-gray-600 transition hover:border-blue-300 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total price</p>
                    <p className="text-base font-bold text-gray-900">
                      {(item.price * item.quantity).toLocaleString("en-US")} Toman
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Back to shop
          </Link>
        </div>

        <div className="space-y-6">
          <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order summary</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{total.toLocaleString("en-US")} Toman</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-semibold" : "text-gray-600"}>
                  {shipping === 0 ? "Free" : `${shipping.toLocaleString("en-US")} Toman`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{grandTotal.toLocaleString("en-US")} Toman</span>
              </div>
            </div>
          </div>

          <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping information</h2>
            <div className="space-y-4 text-sm text-gray-700">
              <label className="block">
                <span className="text-gray-600">First name</span>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="e.g. Ali"
                />
              </label>

              <label className="block">
                <span className="text-gray-600">Last name</span>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="e.g. Rezaei"
                />
              </label>

              <label className="block">
                <span className="text-gray-600">City</span>
                <input
                  type="text"
                  value={form.city}
                  onChange={handleChange("city")}
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="e.g. Tehran"
                />
              </label>

              <label className="block">
                <span className="text-gray-600">Full address</span>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange("address")}
                  className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Street, building, unit"
                />
              </label>

              <label className="block">
                <span className="text-gray-600">Additional notes</span>
                <textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  rows={4}
                  className="mt-2 w-full resize-none rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="e.g. call before arrival"
                />
              </label>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={!canSubmit}
                className={`w-full rounded-3xl px-5 py-3 text-sm font-bold transition ${
                  canSubmit
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
