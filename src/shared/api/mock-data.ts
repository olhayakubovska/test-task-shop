import { getPlaceholderImage } from "@/shared/lib/placeholder";
import {
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  INSOLE_SIZES,
  MATERIAL_OPTIONS,
} from "@/shared/config/filters";
import type { Product, ProductCategory } from "@/shared/api/types";

const NAME_TEMPLATES = [
  "SCARLET PRO GLOSS",
  "NOIR FLEX STEP",
  "VELVET ROSE HEEL",
  "ONYX SHADOW LINE",
  "BLUSH SATIN MUSE",
  "CRIMSON FLAME ARCH",
  "PEARL ELEGANCE STEP",
  "MIDNIGHT VELOUR FLEX",
];

const BASE_CATEGORY_COUNTS: { category: ProductCategory; count: number }[] = [
  { category: "high-heels", count: 95 },
  { category: "training", count: 31 },
  { category: "professional", count: 31 },
];

const SALE_EVERY_N = 2; // every other product gets marked as sale

function buildLine(category: ProductCategory): string {
  switch (category) {
    case "training":
      return "HIGH HEELS / TRAINING LINE";
    case "professional":
      return "HIGH HEELS / PROFESSIONAL LINE";
    default:
      return "HIGH HEELS / PROFESSIONAL LINE";
  }
}

function buildProducts(): Product[] {
  const products: Product[] = [];
  let index = 0;

  for (const { category, count } of BASE_CATEGORY_COUNTS) {
    for (let i = 0; i < count; i += 1) {
      const name = NAME_TEMPLATES[index % NAME_TEMPLATES.length];
      const color = COLOR_OPTIONS[index % COLOR_OPTIONS.length].value;
      const material = MATERIAL_OPTIONS[index % MATERIAL_OPTIONS.length].value;
      const insoleSize = INSOLE_SIZES[index % INSOLE_SIZES.length];
      const heelHeight =
        index % 9 === 0
          ? HEEL_HEIGHT_OPTIONS[2].value // "6" Newbie
          : category === "training"
            ? HEEL_HEIGHT_OPTIONS[1].value // "8.5" Training
            : HEEL_HEIGHT_OPTIONS[0].value; // "10" Professional

      const price = 3400 + (index % 7) * 350;
      const isSale = index % SALE_EVERY_N === 0;
      const categories: ProductCategory[] = [category];
      if (isSale) categories.push("sale");

      products.push({
        id: `product-${index + 1}`,
        name,
        line: buildLine(category),
        categories,
        price,
        discountPrice: isSale ? Math.round((price * 0.8) / 10) * 10 : undefined,
        insoleSize,
        heelHeight,
        material,
        color,
        image: getPlaceholderImage(),
      });

      index += 1;
    }
  }

  return products;
}

export const PRODUCTS: Product[] = buildProducts();

export function getCategoryCounts(): Record<ProductCategory, number> {
  return PRODUCTS.reduce(
    (acc, product) => {
      for (const category of product.categories) {
        acc[category] = (acc[category] ?? 0) + 1;
      }
      return acc;
    },
    {} as Record<ProductCategory, number>,
  );
}
