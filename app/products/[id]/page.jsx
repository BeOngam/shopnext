import { getProductById, getRelatedProducts, products } from "@/lib/data";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);
  if (!product) notFound();

  const related = getRelatedProducts(product.id);

  return <ProductDetail product={product} related={related} />;
}