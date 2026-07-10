import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default function ProductPage({ params }) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) notFound();
  return <ProductDetail product={product} related={products.filter((p) => p.id !== product.id)} />;
}