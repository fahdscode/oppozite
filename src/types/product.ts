export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  category: string;
  sizes: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
}
