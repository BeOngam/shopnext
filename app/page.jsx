import { products, categories } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}