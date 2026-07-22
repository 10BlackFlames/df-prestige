import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group block overflow-hidden rounded-3xl"
    >
      <div className="relative h-80 overflow-hidden rounded-3xl">

        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-8 left-8">
          <h3 className="mb-2 text-3xl font-bold text-white">
            {category.name}
          </h3>

          <p className="max-w-xs text-gray-200">
            {category.description}
          </p>
        </div>

      </div>
    </Link>
  );
}