import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import ShopSidebar from "@/components/product/ShopSidebar";
import ProductGrid from "@/components/product/ProductGrid";

export default function ShopPage() {
  return (
    <Container className="py-16">
      <SectionTitle
        title="Shop"
        subtitle="Premium Collection"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
        <ShopSidebar />
        <ProductGrid />
      </div>
    </Container>
  );
}