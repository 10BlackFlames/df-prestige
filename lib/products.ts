import { Product } from "@/types/product";

export const featuredProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Force 1",
    slug: "nike-air-force-1",
    price: 85000,
    image: "/images/products/air-force.jpg",
    category: "Sneakers",
    rating: 4.9,
    reviews: 120,
    isNew: true,
  },
  {
    id: "2",
    name: "New Balance 9060",
    slug: "new-balance-9060",
    price: 125000,
    image: "/images/products/new-balance.jpg",
    category: "Sneakers",
    rating: 4.8,
    reviews: 89,
  },
];