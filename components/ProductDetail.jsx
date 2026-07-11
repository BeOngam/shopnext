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
      <div className="bg-[#f5f5f5] border-b border-gray-200 px-6 py-3">
        <nav className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-400">
          <Link href="/" className="hover:text-black transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black transition">Products</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-20">
          <div className="lg:w-1/2">
            <div className="bg-[#f5f5f5] flex items-center justify-center" style={{ aspectRatio: "1/1", fontSize: "140px" }}>
              {categoryEmoji[product.category] ?? "📦"}
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-black uppercase leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-xs text-gray-500 font-bold">{product.rating} / 5</span>
            </div>

            <div className="mb-6">
              <p className="text-3xl font-black">
                {product.price.toLocaleString("fa-IR")}
                <span className="text-base font-bold text-gray-500 mr-2">Toman</span>
              </p>
              {product.stock <= 3 && (
                <p className="text-red-600 text-xs font-bold uppercase tracking-wide mt-1">
                  ⚠ Only {product.stock} left
                </p>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8 border-t border-gray-200 pt-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-xs font-black uppercase tracking-widest">Quantity</p>
              <div className="flex items-center border-2 border-black">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center font-black text-lg hover:bg-black hover:text-white transition"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-black border-x-2 border-black">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center font-black text-lg hover:bg-black hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-4 font-black uppercase text-sm tracking-widest border-2 transition mb-3 ${
                added
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-black text-white border-black hover:bg-white hover:text-black"
              }`}
            >
              {added ? "✓ Added to cart!" : "Add to cart"}
            </button>

            <Link
              href="/cart"
              className="w-full py-4 font-black uppercase text-sm tracking-widest border-2 border-black text-center hover:bg-black hover:text-white transition"
            >
              View cart
            </Link>

            <div className="flex gap-6 mt-8 pt-6 border-t border-gray-200 text-xs font-bold uppercase tracking-wide text-gray-500">
              <span>🚚 Fast shipping</span>
              <span>🔒 Secure payment</span>
              <span>🔄 7-day return</span>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <div className="border-t border-black pt-10 mb-8 flex items-end justify-between">
              <h2 className="text-2xl font-black uppercase">Related products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
