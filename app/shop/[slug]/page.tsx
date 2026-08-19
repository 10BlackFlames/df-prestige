import Image from "next/image";
import { notFound } from "next/navigation";

import ProductPurchase from "@/components/product/ProductPurchase";
import Section from "@/components/ui/Section";
import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
      category: true,
      sizes: true,
    },
  });

  if (!product) {
    notFound();
  }

  const images = product.images;

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Product Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
            <Image
              src={images[0]?.url ?? "/images/placeholder.jpg"}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-xl bg-surface"
                >
                  <Image
                    src={image.url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm uppercase tracking-widest text-muted">
            {product.category.name}
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-bold text-primary">
            {formatCurrency(Number(product.price))}
          </p>

          <div className="mt-6 h-px bg-border" />

          <p className="mt-6 leading-8 text-muted">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="text-sm text-muted">
              Availability
            </p>

            <p
              className={
                product.stock > 0
                  ? "mt-1 font-medium text-success"
                  : "mt-1 font-medium text-danger"
              }
            >
              {product.stock > 0
                ? `${product.stock} available`
                : "Out of stock"}
            </p>
          </div>

          <ProductPurchase
            productId={product.id}
            productName={product.name}
            price={Number(product.price)}
            image={product.images[0]?.url ?? "/images/placeholder.jpg"}
            sizes={product.sizes}
            stock={product.stock}
          />
        </div>
      </div>
    </Section>
  );
}