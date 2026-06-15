import type {
  HeelHeight,
  ProductCategory,
  ProductColor,
  ProductMaterial,
  SortOption,
} from "@/shared/api/types";

export const CATEGORY_OPTIONS: { value: ProductCategory; label: string }[] = [
  { value: "sale", label: "Акційні товари" },
  { value: "high-heels", label: "High heels" },
  { value: "training", label: "Training" },
  { value: "professional", label: "Professional" },
];

export const INSOLE_SIZES = [23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5];

export const HEEL_HEIGHT_OPTIONS: { value: HeelHeight; label: string }[] = [
  { value: "10", label: "10 см (Professional)" },
  { value: "8.5", label: "8.5 см (Training)" },
  { value: "6", label: "6 см (Newbie)" },
];

export const MATERIAL_OPTIONS: { value: ProductMaterial; label: string }[] = [
  { value: "leather", label: "Натуральна шкіра" },
  { value: "suede", label: "Преміальна замша" },
  { value: "satin", label: "Сатин" },
];

export const COLOR_OPTIONS: { value: ProductColor; label: string; hex: string }[] = [
  { value: "black", label: "Чорний", hex: "#111111" },
  { value: "red", label: "Червоний", hex: "#E53935" },
  { value: "white", label: "Білий", hex: "#FFFFFF" },
  { value: "beige", label: "Бежевий", hex: "#EBDFD2" },
];

export const PRICE_RANGE = { min: 0, max: 10000 };

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "За замовчуванням" },
  { value: "price-asc", label: "Спочатку дешевші" },
  { value: "price-desc", label: "Спочатку дорожчі" },
  { value: "name-asc", label: "За назвою (А-Я)" },
  { value: "name-desc", label: "За назвою (Я-А)" },
];

export const PAGE_SIZE = 24;
