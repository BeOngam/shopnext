"use client";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-blue-600">
        ShopNext
      </Link>
      <div className="flex gap-6 text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          خانه
        </Link>
        <Link href="/products" className="hover:text-blue-600">
          محصولات
        </Link>
      </div>
      <Link href="/cart" className="relative">
        <span className="text-2xl">🛒</span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
}