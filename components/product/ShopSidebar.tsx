import { categories } from "@/lib/categories";

export default function ShopSidebar() {
  return (
    <aside className="card p-6">
      <h3 className="mb-6 text-xl font-semibold">
        Categories
      </h3>

      <div className="space-y-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-surface hover:text-primary"
          >
            {category.name}
          </button>
        ))}
      </div>

      <hr className="my-8 border-border" />

      <h3 className="mb-4 text-xl font-semibold">
        Price Range
      </h3>

      <input
        type="range"
        min={0}
        max={500000}
        className="w-full"
      />

      <div className="mt-4 flex justify-between text-sm text-muted">
        <span>₦0</span>
        <span>₦500,000</span>
      </div>
    </aside>
  );
}