"use client";
import { useCartStore } from "@/store/cartStore";

const categoryEmoji = {
  Apparel: "👕",
  Footwear: "👟",
  Electronics: "⌚",
};

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group border border-gray-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="h-44 bg-linear-to-br from-blue-50 to-indigo-100 rounded-xl mb-4 flex flex-col items-center justify-center text-5xl gap-2">
        <span>{categoryEmoji[product.category] ?? "📦"}</span>
      </div>

      <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full w-fit mb-1">
        {product.category}
      </span>

      <h3 className="font-bold text-gray-800 text-base mb-1 leading-snug">
        {product.name}
      </h3>

      <div className="flex items-center gap-1 text-yellow-400 text-sm mb-3">
        {"★".repeat(Math.round(product.rating))}
        {"☆".repeat(5 - Math.round(product.rating))}
        <span className="text-gray-400 text-xs mr-1">({product.rating})</span>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div>
          <span className="font-extrabold text-blue-700 text-lg">
            {product.price.toLocaleString("en-US")}
          </span>
          <span className="text-gray-400 text-xs mr-1">USD</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          + Add to Cart
        </button>
      </div>

      {product.stock <= 3 && (
        <p className="text-red-400 text-xs mt-2">⚠️ Only {product.stock} left in stock</p>
      )}
    </div>
  );
}