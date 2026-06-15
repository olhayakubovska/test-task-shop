export type ProductCategory = "high-heels" | "training" | "professional" | "sale";
export type HeelHeight = "10" | "8.5" | "6";
export type ProductMaterial = "leather" | "suede" | "satin";
export type ProductColor = "black" | "red" | "white" | "beige";

export interface Product {
  id: string;
  name: string;
  line: string;
  categories: ProductCategory[];
  price: number;
  discountPrice?: number;
  insoleSize: number;
  heelHeight: HeelHeight;
  material: ProductMaterial;
  color: ProductColor;
  image: string;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface ProductsQuery {
  category?: ProductCategory;
  insoleSize?: number;
  heelHeight?: HeelHeight;
  material?: ProductMaterial;
  color?: ProductColor;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categoryCounts: Record<ProductCategory, number>;
}
