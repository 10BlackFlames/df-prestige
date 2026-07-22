import CategoryCard from "./CategoryCard";

import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

import { categories } from "@/lib/categories";

export default function Categories() {
  return (
    <Section>

      <SectionTitle
        subtitle="Browse"
        title="Shop by Category"
        center
      />

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
          />
        ))}
      </div>

    </Section>
  );
}