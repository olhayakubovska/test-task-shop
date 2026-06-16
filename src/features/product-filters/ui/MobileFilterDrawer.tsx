"use client";

import { useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { CloseIcon, FilterIcon } from "@/shared/ui/icons";
import { FilterSidebar, type FilterSidebarHandle } from "@/features/product-filters/ui/FilterSidebar";
import { getFilterChips } from "@/features/product-filters/model/getFilterChips";
import { usePreviewCount } from "@/features/product-filters/model/usePreviewCount";
import { useCatalogFilters, type CatalogFilters } from "@/shared/lib/useCatalogFilters";

export function MobileFilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { clearAll, filters } = useCatalogFilters();
  const sidebarRef = useRef<FilterSidebarHandle>(null);
  const [pendingFilters, setPendingFilters] = useState<CatalogFilters>(filters);

  const chips = getFilterChips(pendingFilters);
  const previewCount = usePreviewCount(pendingFilters);

  const handleApply = () => {
    sidebarRef.current?.apply();
    setIsOpen(false);
  };

  const handleClear = () => {
    clearAll();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="3xl:hidden bg-pink-main py-2 h-7.5 px-8 gap-2 text-white-main font-golos font-semibold text-xs md:px-4 md:rounded-none md:w-34.5"
      >
        <FilterIcon />
        <span className="font-semibold text-xs leading-none w-12">Фільтри</span>
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-50 flex 3xl:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <button
          type="button"
          aria-label="Закрити фільтри"
          onClick={() => setIsOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "relative flex h-full w-76 flex-col overflow-y-auto bg-white-main p-4 shadow-xl transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-golos font-semibold text-sm tracking-0.7 uppercase">Фільтрація</h2>
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
            <>
              <div className="border-t border-border pb-3 -mx-4" />
              <div className="mb-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-montserrat font-bold text-[10px] tracking-[1px] uppercase">
                    Обрано:
                  </span>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="font-montserrat font-bold text-[10px] tracking-[1px] uppercase underline decoration-solid"
                  >
                    Очистити
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {chips.map((chip) => (
                    <span
                      key={chip.key}
                      className="flex items-center gap-1 bg-[#9999991A] px-1 py-2 h-7 font-golos font-medium text-[10px] tracking-normal"
                    >
                      {chip.label}
                      <button
                        type="button"
                        aria-label={`Видалити ${chip.label}`}
                        onClick={() => sidebarRef.current?.removePending(chip.key)}
                        className="ml-1 leading-none text-[#0D0D0D] hover:text-pink-main"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          <FilterSidebar
            ref={sidebarRef}
            showApplyButton={false}
            onPendingChange={setPendingFilters}
          />

          <div className="border-t border-[#D9D9D9] mb-4 -mx-4" />

          <div className="flex gap-2">
            <Button
              onClick={handleClear}
              className="flex-1 border border-dark-main text-dark-main text-[10px] leading-2 font-semibold uppercase py-3"
            >
              Очистити
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-dark-main text-white-main text-[10px] leading-2 font-semibold uppercase py-3"
            >
              {previewCount !== null ? `Показати (${previewCount})` : "Показати товари"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
