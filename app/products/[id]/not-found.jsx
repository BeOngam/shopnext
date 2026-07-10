import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="text-6xl font-black text-blue-600 mb-4">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Product Not Found</h1>
      <p className="text-gray-500 mb-6">
        The product you are looking for does not exist or may have been removed.
      </p>
      <Link
        href="/products"
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Browse Products
      </Link>
    </div>
  );
}
