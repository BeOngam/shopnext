"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = total >= 500000 ? 0 : 30000;
  const grandTotal = total + shipping;

  const canSubmit =
    items.length > 0 &&
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.city.trim() &&
    form.address.trim();

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: form,
          total,
          shipping,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Order creation failed");
      }

      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-4">
        <h2 className="text-3xl font-bold">Your cart is empty</h2>
        <p className="text-gray-500">Add some products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8 rounded-4xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="mt-2 text-gray-500">Review your details and confirm your order.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Shipping information</h2>
            <div className="space-y-4 text-sm text-gray-700">
              {[
                { label: "First name", field: "firstName", placeholder: "e.g. Ali" },
                { label: "Last name", field: "lastName", placeholder: "e.g. Rezaei" },
                { label: "City", field: "city", placeholder: "e.g. Tehran" },
                { label: "Full address", field: "address", placeholder: "Street, building, unit" },
              ].map(({ label, field, placeholder }) => (
                <label key={field} className="block">
                  <span className="text-gray-600">{label}</span>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={handleChange(field)}
                    placeholder={placeholder}
                    className="mt-2 w-full rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </label>
              ))}

              <label className="block">
                <span className="text-gray-600">Additional notes</span>
                <textarea
                  value={form.notes}
                  onChange={handleChange("notes")}
                  rows={4}
                  placeholder="e.g. call before arrival"
                  className="mt-2 w-full resize-none rounded-3xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </label>
            </div>
          </div>

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className={`w-full rounded-3xl px-5 py-3 text-sm font-bold transition ${
              canSubmit && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Placing order..." : "Place order"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order summary</h2>
            <div className="space-y-4 text-sm text-gray-600">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.quantity} × {item.price.toLocaleString("en-US")} Toman</p>
                  </div>
                  <p className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString("en-US")} Toman</p>
                </div>
              ))}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `${shipping.toLocaleString("en-US")} Toman`}</span>
                </div>
                <div className="mt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{grandTotal.toLocaleString("en-US")} Toman</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
