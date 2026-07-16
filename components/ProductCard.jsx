"use client";
import Image from "next/image";
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
    <div className="group flex flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition hover:shadow-md">
      {/* Image area */}
      <Link href={`/products/${product.id}`} className="block overflow-hidden rounded-t-[28px] bg-[#f5f5f5]">
        <div className="relative h-56 overflow-hidden bg-[#f5f5f5]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-105">
              {categoryEmoji[product.category] ?? "📦"}
            </div>
          )}
        </div>

        {product.stock <= 3 && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            Only a few left
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-5">
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