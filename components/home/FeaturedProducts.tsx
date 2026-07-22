import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { featuredProducts } from "@/lib/products";

export default function FeaturedProducts() {
  return (
    <Section>
      <SectionTitle
        subtitle="Featured"
        title="Our Best Collection"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Section>
  );
}