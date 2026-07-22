import Image from "next/image";
import Link from "next/link";

import Badge from "@/components/ui/Badge";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatCurrency";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary"
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {product.isNew && (
          <div className="absolute left-4 top-4">
            <Badge>New</Badge>
          </div>
        )}

        {product.isSale && (
          <div className="absolute right-4 top-4">
            <Badge>Sale</Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-2 p-5">
        <p className="text-sm text-muted">
          {product.category}
        </p>

        <h3 className="text-xl font-semibold">
          {product.name}
        </h3>

        <p className="font-bold text-primary">
          {formatCurrency(product.price)}
        </p>

        <p className="text-sm text-muted">
          ⭐ {product.rating} ({product.reviews} reviews)
        </p>
      </div>
    </Link>
  );
}