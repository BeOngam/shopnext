"use client";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">
        تصویر محصول
      </div>
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-2">{product.category}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-blue-600">
          {product.price.toLocaleString()} تومان
        </span>
        <button
          onClick={() => addItem(product)}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
}