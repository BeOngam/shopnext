"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const categoryEmoji = {
  Apparel: "👕",
  Footwear: "👟",
  Electronics: "⌚",
};

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="group flex flex-col bg-white">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-[#f5f5f5]" style={{aspectRatio:"1/1"}}>
        <div className="absolute inset-0 flex items-center justify-center text-7xl transition-transform duration-300 group-hover:scale-105">
          {categoryEmoji[product.category] ?? "📦"}
        </div>
        {product.stock <= 3 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wide">
            Only a few left
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="pt-3 pb-4 flex flex-col gap-1">
        <Link href={`/products/${product.id}`}>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {product.category}
          </p>
          <h3 className="font-bold text-base leading-tight hover:underline underline-offset-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <span className="text-black">{"★".repeat(Math.round(product.rating))}</span>
          <span>{"☆".repeat(5 - Math.round(product.rating))}</span>
          <span className="mr-1">({product.rating})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-base">
            {product.price.toLocaleString("en-US")} Toman
          </span>
          <button
            onClick={() => addItem(product)}
            className="text-[11px] font-black uppercase tracking-wide border-b-2 border-black pb-0.5 hover:opacity-60 transition"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}