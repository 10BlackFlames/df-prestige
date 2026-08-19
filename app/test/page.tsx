import { prisma } from "@/lib/prisma";

export default async function TestPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
    },
  });

  return (
    <main className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Database Test
      </h1>

      <pre>
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}