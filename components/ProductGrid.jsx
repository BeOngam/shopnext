"use client";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const categoryLabels = {
    All: "همه",
    Apparel: "پوشاک",
    Footwear: "کفش",
    Electronics: "الکترونیک",
  };

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">محصولات ویژه</h2>
        <a
          href="/products"
          className="text-blue-600 text-sm font-medium hover:underline"
        >
          مشاهده همه ←
        </a>
      </div>

      {/* Category filter */}
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
            {categoryLabels[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-lg">محصولی در این دسته‌بندی یافت نشد.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Trust badges */}
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-500">
        {[
          { icon: "🚚", label: "ارسال رایگان", sub: "برای خریدهای بالای ۵۰۰ هزار" },
          { icon: "🔄", label: "بازگشت آسان", sub: "تا ۷ روز پس از خرید" },
          { icon: "🔒", label: "پرداخت امن", sub: "درگاه معتبر بانکی" },
          { icon: "🎧", label: "پشتیبانی ۲۴/۷", sub: "همیشه در دسترس هستیم" },
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