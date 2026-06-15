"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { CloseIcon, FilterIcon } from "@/shared/ui/icons";
import { FilterSidebar } from "@/features/product-filters/ui/FilterSidebar";
import type { ProductCategory } from "@/shared/api/types";

interface MobileFilterDrawerProps {
  categoryCounts?: Record<ProductCategory, number>;
}

export function MobileFilterDrawer({ categoryCounts }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
              <h2 className="text-sm font-bold uppercase tracking-wide">Фільтри</h2>
              <button
                type="button"
                aria-label="Закрити"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>
            <FilterSidebar categoryCounts={categoryCounts} />
            <Button onClick={() => setIsOpen(false)} className="mt-4 w-full">
              Показати товари
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
