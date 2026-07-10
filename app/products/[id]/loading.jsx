export default function ProductLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-14 w-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <p className="text-gray-500">Loading product details...</p>
      </div>
    </div>
  );
}
