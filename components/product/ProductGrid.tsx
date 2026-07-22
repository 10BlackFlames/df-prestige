import ProductCard from "./ProductCard";

import { featuredProducts } from "@/lib/products";

export default function ProductGrid() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="rounded-xl border border-border bg-card px-4 py-3 outline-none"
        />

        <select className="rounded-xl border border-border bg-card px-4 py-3">
          <option>Newest</option>
          <option>Price: Low → High</option>
          <option>Price: High → Low</option>
          <option>Most Popular</option>
        </select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
}