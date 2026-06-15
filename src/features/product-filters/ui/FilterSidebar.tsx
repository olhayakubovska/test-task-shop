"use client";

import {
  CATEGORY_OPTIONS,
  COLOR_OPTIONS,
  HEEL_HEIGHT_OPTIONS,
  INSOLE_SIZES,
  MATERIAL_OPTIONS,
  PRICE_RANGE,
} from "@/shared/config/filters";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Chip } from "@/shared/ui/Chip";
import { ColorSwatch } from "@/shared/ui/ColorSwatch";
import { RangeSlider } from "@/shared/ui/RangeSlider";
import { formatPrice } from "@/shared/lib/format";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { FilterSection } from "@/features/product-filters/ui/FilterSection";
import type { ProductCategory } from "@/shared/api/types";

interface FilterSidebarProps {
  categoryCounts?: Record<ProductCategory, number>;
}

export function FilterSidebar({ categoryCounts }: FilterSidebarProps) {
  const {
    filters,
    toggleCategory,
    toggleInsoleSize,
    toggleHeelHeight,
    toggleMaterial,
    toggleColor,
    setPriceRange,
  } = useCatalogFilters();

  const priceValue: [number, number] = [
    filters.minPrice ?? PRICE_RANGE.min,
    filters.maxPrice ?? PRICE_RANGE.max,
  ];

  return (
    <aside className="w-full">
      <FilterSection title="Категорії">
        {CATEGORY_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            label={`${option.label}${categoryCounts ? ` (${categoryCounts[option.value] ?? 0})` : ""}`}
            checked={filters.category === option.value}
            onChange={() => toggleCategory(option.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Розмір стельки (см)">
        <div className="grid grid-cols-4 gap-2">
          {INSOLE_SIZES.map((size) => (
            <Chip
              key={size}
              active={filters.insoleSize === size}
              onClick={() => toggleInsoleSize(size)}
            >
              {size.toFixed(1)}
            </Chip>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Параметри каблука">
        {HEEL_HEIGHT_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={filters.heelHeight === option.value}
            onChange={() => toggleHeelHeight(option.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Матеріал">
        {MATERIAL_OPTIONS.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={filters.material === option.value}
            onChange={() => toggleMaterial(option.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Колір">
        <div className="grid grid-cols-2 gap-2">
          {COLOR_OPTIONS.map((option) => (
            <ColorSwatch
              key={option.value}
              hex={option.hex}
              label={option.label}
              active={filters.color === option.value}
              onClick={() => toggleColor(option.value)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Ціна, грн" defaultOpen>
        <RangeSlider
          min={PRICE_RANGE.min}
          max={PRICE_RANGE.max}
          step={100}
          value={priceValue}
          onChange={setPriceRange}
        />
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>{formatPrice(priceValue[0])}</span>
          <span>{formatPrice(priceValue[1])}</span>
        </div>
      </FilterSection>
    </aside>
  );
}
