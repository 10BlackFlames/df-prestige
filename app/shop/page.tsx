import ProductCard from "@/components/product/ProductCard";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products.map((product) => ({
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
        subtitle="Shop"
        title="Our Collection"
      />

      {formattedProducts.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted">
            No products available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {formattedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </Section>
  );
}