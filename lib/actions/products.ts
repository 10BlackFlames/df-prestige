"use server";

import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      featured: true,
    },

    include: {
      images: true,
      category: true,
    },
  });
}