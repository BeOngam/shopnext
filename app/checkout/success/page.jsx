import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-xl rounded-4xl border border-gray-200 bg-white p-10 shadow-sm">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </span>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">Order placed successfully</h1>
        <p className="mt-4 text-gray-600">
          Thank you! Your order has been received. We will notify you when it is being processed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
