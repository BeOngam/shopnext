"use client";
import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "./ProductCard";

const categoryEmoji = {
  Apparel: "👕",
  Footwear: "👟",
  Electronics: "⌚",
};

export default function ProductDetail({ product, related }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <span>›</span>
        <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
        <span>›</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      {/* Main section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Image */}
        <div className="lg:w-1/2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl h-80 flex items-center justify-center text-9xl">
            {categoryEmoji[product.category] ?? "📦"}
          </div>
        </div>

        {/* Info */}
        <div className="lg:w-1/2 flex flex-col">
          {/* Category badge */}
          <span className="text-xs text-blue-500 font-medium bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
            {product.category}
          </span>

          <h1 className="text-3xl font-extrabold text-gray-800 mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400 text-lg">
              {"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-sm text-gray-400">{product.rating} out of 5</span>
          </div>

          {/* Price */}
          <div className="bg-blue-50 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
            <span className="text-3xl font-extrabold text-blue-700">
              {product.price.toLocaleString("en-US")}
              <span className="text-base font-normal text-gray-400 mr-1">USD</span>
            </span>
            {product.stock <= 5 && (
              <span className="text-xs text-red-400 font-medium bg-red-50 px-3 py-1 rounded-full">
                ⚠️ Only {product.stock} left
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed mb-6">{product.description}</p>

          {/* Quantity + Add */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="text-gray-500 hover:text-blue-600 font-bold text-lg w-6 text-center"
              >−</button>
              <span className="font-bold text-gray-800 w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="text-gray-500 hover:text-blue-600 font-bold text-lg w-6 text-center"
              >+</button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-xl font-bold text-base transition-all active:scale-95 ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
          </div>

          <Link
            href="/cart"
            className="text-center text-blue-600 border border-blue-200 rounded-xl py-3 font-medium hover:bg-blue-50 transition text-sm"
          >
            View Cart
          </Link>

          {/* Trust row */}
          <div className="flex gap-4 mt-6 text-xs text-gray-400">
            <span>🚚 Fast Shipping</span>
            <span>🔒 Secure Payment</span>
            <span>🔄 7-day return guarantee</span>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}