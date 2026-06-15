"use client";

import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  MATERIAL_OPTIONS,
  PRICE_RANGE,
} from "@/shared/config/filters";
import { formatPrice } from "@/shared/lib/format";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { CloseIcon } from "@/shared/ui/icons";

export function ActiveFiltersBar() {
  const { filters, removeFilter, clearAll } = useCatalogFilters();

  const chips: { key: Parameters<typeof removeFilter>[0]; label: string }[] = [];

  if (filters.category) {
    const option = CATEGORY_OPTIONS.find((item) => item.value === filters.category);
    if (option) chips.push({ key: "category", label: `Категорія: ${option.label}` });
  }
  if (filters.insoleSize) {
    chips.push({ key: "size", label: `Розмір стельки (см): ${filters.insoleSize}` });
  }
  if (filters.heelHeight) {
    const option = HEEL_HEIGHT_OPTIONS.find((item) => item.value === filters.heelHeight);
    if (option) chips.push({ key: "heel", label: `Параметри каблука: ${option.label}` });
  }
  if (filters.material) {
    const option = MATERIAL_OPTIONS.find((item) => item.value === filters.material);
    if (option) chips.push({ key: "material", label: `Матеріал: ${option.label}` });
  }
  if (filters.color) {
    const option = COLOR_OPTIONS.find((item) => item.value === filters.color);
    if (option) chips.push({ key: "color", label: `Колір: ${option.label}` });
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? PRICE_RANGE.min;
    const max = filters.maxPrice ?? PRICE_RANGE.max;
    chips.push({ key: "price", label: `Ціна: ${formatPrice(min)} – ${formatPrice(max)}` });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border py-4">
      <span className="text-xs font-bold uppercase tracking-wide text-text-muted">Фільтри:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => removeFilter(chip.key)}
          className="flex items-center gap-2 rounded-full border border-border bg-bg-muted px-3 py-1.5 text-sm cursor-pointer hover:border-foreground"
        >
          {chip.label}
          <CloseIcon />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-auto rounded-full bg-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-background cursor-pointer"
      >
        очистити
      </button>
    </div>
  );
}
