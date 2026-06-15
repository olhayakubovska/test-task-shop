"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { CloseIcon, FilterIcon } from "@/shared/ui/icons";
import { FilterSidebar } from "@/features/product-filters/ui/FilterSidebar";
import { useActiveFilterChips } from "@/features/product-filters/model/useActiveFilterChips";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import type { ProductCategory } from "@/shared/api/types";

interface MobileFilterDrawerProps {
  categoryCounts?: Record<ProductCategory, number>;
  total?: number;
}

export function MobileFilterDrawer({ categoryCounts, total }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAll } = useCatalogFilters();
  const { chips, removeFilter } = useActiveFilterChips();

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)} className="lg:hidden">
        <FilterIcon />
        Фільтри
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            aria-label="Закрити фільтри"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-background p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide">Фільтрація</h2>
              <button
                type="button"
                aria-label="Закрити"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            {chips.length > 0 && (
              <div className="mb-4 border-b border-border pb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wide text-text-muted">Обрано:</span>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-xs font-bold uppercase tracking-wide underline cursor-pointer"
                  >
                    Очистити
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
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
                </div>
              </div>
            )}

            <FilterSidebar categoryCounts={categoryCounts} />

            <Button onClick={() => setIsOpen(false)} className="mt-4 w-full">
              {total !== undefined ? `Показати (${total})` : "Показати товари"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
