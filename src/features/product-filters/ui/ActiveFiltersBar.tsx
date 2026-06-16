"use client";

import { useActiveFilterChips } from "@/features/product-filters/model/useActiveFilterChips";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { CloseIcon } from "@/shared/ui/icons";

export function ActiveFiltersBar() {
  const { clearAll } = useCatalogFilters();
  const { chips, removeFilter } = useActiveFilterChips();

  if (chips.length === 0) return null;

  return (
    <div className="hidden flex-wrap items-center gap-2 border-b border-border py-2 lg:flex">
      <span className="text-xs font-bold uppercase tracking-wide h-[30px] text-text-muted">Фільтри:</span>
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
