"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-6">Upload Image to Cloudinary</h1>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-black/10 bg-white p-8 shadow-lg">
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-gray-700 mb-2">
            Choose image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={uploading || !file}
          className="w-full rounded-xl bg-black px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload to Cloudinary"}
        </button>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-sm text-green-700">
            <p className="font-bold">Upload successful!</p>
            <p className="mt-3">URL: <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{result.url}</a></p>
            <p>Public ID: {result.public_id}</p>
            <p>Size: {result.width}×{result.height}</p>
          </div>
        )}
      </form>
    </div>
  );
}
