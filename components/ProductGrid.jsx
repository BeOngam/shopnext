"use client";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "./ProductCard";

function FeatureIcon({ type }) {
  const commonProps = {
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    viewBox: "0 0 24 24",
  };

  switch (type) {
    case "shipping":
      return (
        <svg {...commonProps}>
          <path d="M3 7h11v8H3z" />
          <path d="M14 9h4l3 3v3h-7" />
          <circle cx="7.5" cy="17.5" r="1.5" />
          <circle cx="16.5" cy="17.5" r="1.5" />
        </svg>
      );
    case "returns":
      return (
        <svg {...commonProps}>
          <path d="M7 7h10a4 4 0 1 1 0 8H9" />
          <path d="m10 11-3 3 3 3" />
        </svg>
      );
    case "payment":
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
          <path d="M7 14h2" />
        </svg>
      );
    case "support":
      return (
        <svg {...commonProps}>
          <path d="M7 8a4 4 0 1 1 8 0v1" />
          <path d="M5 10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1l-3 3-3-3H8a3 3 0 0 1-3-3z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ProductGrid({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="max-w-screen-xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6 border-b border-black pb-4">
        <h2 className="text-2xl font-black uppercase tracking-tight">Featured Products</h2>
        <Link href="/products" className="text-xs font-bold uppercase tracking-widest hover:underline">
          View All ←
        </Link>
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

      <div className="mt-14 overflow-hidden rounded-[28px] border border-black/10 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.06)] md:p-6">
        <div className="grid grid-cols-1 gap-4 text-center text-sm text-gray-500 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { type: "shipping", label: "Free Shipping", sub: "Fast delivery for orders above 500,000 Toman" },
            { type: "returns", label: "Easy Returns", sub: "Simple returns within 7 days" },
            { type: "payment", label: "Secure Payment", sub: "Protected gateway for every purchase" },
            { type: "support", label: "24/7 Support", sub: "Always here to help" },
          ].map(({ type, label, sub }, index) => (
            <div
              key={label}
              className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-transparent bg-white/80 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-black/10 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition-transform duration-500 group-hover:scale-110">
                <FeatureIcon type={type} />
              </div>
              <span className="relative z-10 font-semibold text-gray-800">{label}</span>
              <span className="relative z-10 text-xs leading-5 text-gray-500">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
