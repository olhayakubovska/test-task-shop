import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS, getCategoryCounts } from "@/shared/api/mock-data";
import { PAGE_SIZE } from "@/shared/config/filters";
import type {
  HeelHeight,
  Product,
  ProductCategory,
  ProductColor,
  ProductMaterial,
  ProductsResponse,
  SortOption,
} from "@/shared/api/types";

function effectivePrice(product: Product): number {
  return product.discountPrice ?? product.price;
}

function sortProducts(products: Product[], sort: SortOption | null): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

export async function GET(request: NextRequest) {
  // Small artificial delay so loading states are observable.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const params = request.nextUrl.searchParams;

  const category = params.get("category") as ProductCategory | null;
  const insoleSize = params.get("insoleSize");
  const heelHeight = params.get("heelHeight") as HeelHeight | null;
  const material = params.get("material") as ProductMaterial | null;
  const color = params.get("color") as ProductColor | null;
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const sort = params.get("sort") as SortOption | null;
  const page = Math.max(1, Number(params.get("page") ?? "1") || 1);
  const limit = Math.max(1, Number(params.get("limit") ?? String(PAGE_SIZE)) || PAGE_SIZE);

  let filtered = PRODUCTS;

  if (category) {
    filtered = filtered.filter((product) => product.categories.includes(category));
  }
  if (insoleSize) {
    const size = Number(insoleSize);
    filtered = filtered.filter((product) => product.insoleSize === size);
  }
  if (heelHeight) {
    filtered = filtered.filter((product) => product.heelHeight === heelHeight);
  }
  if (material) {
    filtered = filtered.filter((product) => product.material === material);
  }
  if (color) {
    filtered = filtered.filter((product) => product.color === color);
  }
  if (minPrice) {
    const min = Number(minPrice);
    filtered = filtered.filter((product) => effectivePrice(product) >= min);
  }
  if (maxPrice) {
    const max = Number(maxPrice);
    filtered = filtered.filter((product) => effectivePrice(product) <= max);
  }

  filtered = sortProducts(filtered, sort);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  const response: ProductsResponse = {
    items,
    total,
    page,
    limit,
    totalPages,
    categoryCounts: getCategoryCounts(),
  };

  return NextResponse.json(response);
}
