"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
        <a
          href="/products"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          View All ←
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
              activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-lg">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-500">
        {[
          { icon: "🚚", label: "Free Shipping", sub: "On orders over $50" },
          { icon: "🔄", label: "Easy Returns", sub: "Within 7 days of purchase" },
          { icon: "🔒", label: "Secure Payment", sub: "Trusted payment gateway" },
          { icon: "🎧", label: "24/7 Support", sub: "Always available" },
        ].map(({ icon, label, sub }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl p-4"
          >
            <span className="text-2xl">{icon}</span>
            <span className="font-semibold text-gray-700">{label}</span>
            <span className="text-xs text-gray-400">{sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
