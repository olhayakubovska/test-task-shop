"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { Button } from "@/shared/ui/Button";
import { formatPrice } from "@/shared/lib/format";
import { parseCatalogFilters, type CatalogFilters } from "@/shared/lib/useCatalogFilters";
import { FilterSection } from "@/features/product-filters/ui/FilterSection";
import type { CategorySlug, HeelHeight, ProductColor, ProductMaterial } from "@/shared/api/types";
import type { ChipKey } from "@/features/product-filters/model/getFilterChips";

export interface FilterSidebarHandle {
  apply: () => void;
  removePending: (key: ChipKey) => void;
}

interface FilterSidebarProps {
  showApplyButton?: boolean;
  onPendingChange?: (pending: CatalogFilters) => void;
}

export const FilterSidebar = forwardRef<FilterSidebarHandle, FilterSidebarProps>(
  function FilterSidebar({ showApplyButton = true, onPendingChange }, ref) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [pending, setPending] = useState<CatalogFilters>(
      parseCatalogFilters(searchParams)
    );

    useEffect(() => {
      onPendingChange?.(pending);
    }, [pending, onPendingChange]);

    // Sync from URL when sort/page changes (external navigation)
    useEffect(() => {
      setPending(parseCatalogFilters(searchParams));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get("sort"), searchParams.get("page")]);

    const toggleCategory = (cat: CategorySlug) => {
      setPending((p) => ({
        ...p,
        categories: p.categories.includes(cat)
          ? p.categories.filter((c) => c !== cat)
          : [...p.categories, cat],
      }));
    };

    const toggleSimple = <T extends string | number>(
      key: keyof Omit<CatalogFilters, "categories" | "sort" | "page">,
      value: T
    ) => {
      setPending((p) => ({ ...p, [key]: p[key] === value ? undefined : value }));
    };

    const removePending = (key: ChipKey) => {
      setPending((p) => {
        if (key === "category") return { ...p, categories: [] };
        if (key === "price") return { ...p, minPrice: undefined, maxPrice: undefined };
        if (key === "size") return { ...p, insoleSize: undefined };
        if (key === "heel") return { ...p, heelHeight: undefined };
        if (key === "material") return { ...p, material: undefined };
        if (key === "color") return { ...p, color: undefined };
        return p;
      });
    };

    const applyFilters = () => {
      const params = new URLSearchParams();
      const sort = searchParams.get("sort");
      if (sort) params.set("sort", sort);

      if (pending.categories.length > 0)
        params.set("category", pending.categories.join(","));
      if (pending.insoleSize) params.set("size", String(pending.insoleSize));
      if (pending.heelHeight) params.set("heel", pending.heelHeight);
      if (pending.material) params.set("material", pending.material);
      if (pending.color) params.set("color", pending.color);
      if (pending.minPrice != null && pending.minPrice > PRICE_RANGE.min)
        params.set("minPrice", String(pending.minPrice));
      if (pending.maxPrice != null && pending.maxPrice < PRICE_RANGE.max)
        params.set("maxPrice", String(pending.maxPrice));

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useImperativeHandle(ref, () => ({ apply: applyFilters, removePending }));

    const priceValue: [number, number] = [
      pending.minPrice ?? PRICE_RANGE.min,
      pending.maxPrice ?? PRICE_RANGE.max,
    ];

    return (
      <aside className="w-full">
        <div className="border-t border-border -mx-4 3xl:relative 3xl:mx-0 3xl:left-1/2 3xl:-translate-x-1/2 3xl:hidden" />

        <div className="flex flex-col gap-6 mt-4 mb-6 3xl:gap-8 3xl:mt-0">
          <FilterSection title="Категорії">
            {CATEGORY_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={pending.categories.includes(option.value)}
                onChange={() => toggleCategory(option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Розмір стельки (см)">
            <div className="grid grid-cols-4 gap-2">
              {INSOLE_SIZES.map((size) => (
                <Chip
                  key={size}
                  active={pending.insoleSize === size}
                  onClick={() => toggleSimple("insoleSize", size)}
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
                checked={pending.heelHeight === option.value}
                onChange={() => toggleSimple<HeelHeight>("heelHeight", option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Матеріал">
            {MATERIAL_OPTIONS.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={pending.material === option.value}
                onChange={() => toggleSimple<ProductMaterial>("material", option.value)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Колір" noBorder>
            <div className="grid grid-cols-2 gap-3">
              {COLOR_OPTIONS.map((option) => (
                <ColorSwatch
                  key={option.value}
                  hex={option.hex}
                  label={option.label}
                  active={pending.color === option.value}
                  onClick={() => toggleSimple<ProductColor>("color", option.value)}
                />
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Ціна, грн" defaultOpen noBorder>
            <RangeSlider
              min={PRICE_RANGE.min}
              max={PRICE_RANGE.max}
              step={100}
              value={priceValue}
              onChange={([min, max]) =>
                setPending((p) => ({ ...p, minPrice: min, maxPrice: max }))
              }
            />
            <div className="flex items-center justify-between text-sm text-[#0D0D0D] leading-none font-medium 3xl:text-base">
              <span>{formatPrice(priceValue[0])}</span>
              <span>{formatPrice(priceValue[1])}</span>
            </div>
          </FilterSection>

          {showApplyButton && (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setPending({ categories: [], sort: "updated_desc", page: 1 });
                  router.replace(pathname, { scroll: false });
                }}
                className="flex-1 border border-dark-main text-dark-main text-[10px] leading-2 font-semibold uppercase py-3"
              >
                Очистити
              </Button>
              <Button
                onClick={applyFilters}
                className="flex-1 bg-dark-main text-white-main text-[10px] leading-2 font-semibold uppercase py-3"
              >
                Показати
              </Button>
            </div>
          )}
        </div>
      </aside>
    );
  }
);
