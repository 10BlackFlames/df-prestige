import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  // Delete old data
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();

  // Categories
  const sneakers = await prisma.category.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
    },
  });

  const slides = await prisma.category.create({
    data: {
      name: "Slides",
      slug: "slides",
    },
  });

  const tshirts = await prisma.category.create({
    data: {
      name: "T-Shirts",
      slug: "t-shirts",
    },
  });

  // Nike Air Force
  await prisma.product.create({
    data: {
      name: "Nike Air Force 1",
      slug: "nike-air-force-1",

      description:
        "Classic premium sneaker with timeless style.",

      price: 85000,

      stock: 20,

      featured: true,

      categoryId: sneakers.id,

      images: {
        create: [
          {
            url: "/images/products/air-force.jpg",
          },
        ],
      },

      sizes: {
        create: [
          { size: "40", quantity: 4 },
          { size: "41", quantity: 5 },
          { size: "42", quantity: 6 },
          { size: "43", quantity: 5 },
        ],
      },
    },
  });

  // New Balance
  await prisma.product.create({
    data: {
      name: "New Balance 9060",

      slug: "new-balance-9060",

      description:
        "Premium lifestyle sneaker.",

      price: 125000,

      stock: 12,

      featured: true,

      categoryId: sneakers.id,

      images: {
        create: [
          {
            url: "/images/products/new-balance.jpg",
          },
        ],
      },

      sizes: {
        create: [
          { size: "40", quantity: 2 },
          { size: "41", quantity: 3 },
          { size: "42", quantity: 4 },
          { size: "43", quantity: 3 },
        ],
      },
    },
  });

  // DF Slides
  await prisma.product.create({
    data: {
      name: "DF Luxury Slides",

      slug: "df-luxury-slides",

      description:
        "Comfort meets luxury.",

      price: 35000,

      stock: 18,

      featured: true,

      categoryId: slides.id,

      images: {
        create: [
          {
            url: "/images/products/slides.jpg",
          },
        ],
      },

      sizes: {
        create: [
          { size: "40", quantity: 5 },
          { size: "41", quantity: 5 },
          { size: "42", quantity: 4 },
          { size: "43", quantity: 4 },
        ],
      },
    },
  });

  // Premium Tee
  await prisma.product.create({
    data: {
      name: "DF Prestige Premium Tee",

      slug: "df-prestige-premium-tee",

      description:
        "Luxury cotton premium t-shirt.",

      price: 25000,

      stock: 30,

      featured: true,

      categoryId: tshirts.id,

      images: {
        create: [
          {
            url: "/images/products/tshirt.jpg",
          },
        ],
      },

      sizes: {
        create: [
          { size: "S", quantity: 5 },
          { size: "M", quantity: 8 },
          { size: "L", quantity: 9 },
          { size: "XL", quantity: 8 },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });