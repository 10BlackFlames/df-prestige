import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { prisma } from "@/lib/prisma";

export default async function FeaturedProducts() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const products = featuredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    image: product.images[0]?.url ?? "/images/placeholder.jpg",
    category: product.category.name,
    rating: 5,
    reviews: 0,
    isNew: false,
  }));

  return (
    <Section>
      <SectionTitle
        subtitle="Featured"
        title="Our Best Collection"
      />

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Section>
  );
}