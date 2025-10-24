export interface ProductType {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  type: string;
  price: number;
  // rating: number;
  stock: number;
  brand: string;
  discountPercentage?: number;
  currency: "CDF" | "USD";
  target: "man" | "woman" | "kids" | "unisex";
}

export interface ShopType {
  id: string;
  name: string;
  description: string;
  logo: string;
  slug: string;
}

export interface ContentType {
  product: ProductType;
  shop: ShopType;
  url: string;
}
