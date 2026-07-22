export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}