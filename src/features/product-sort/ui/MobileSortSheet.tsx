"use client";

import { useState } from "react";
import { SORT_OPTIONS } from "@/shared/config/filters";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";

export function MobileSortSheet() {
  const { filters, setSort } = useCatalogFilters();
  const [isOpen, setIsOpen] = useState(false);

  const current = SORT_OPTIONS.find((option) => option.value === filters.sort) ?? SORT_OPTIONS[0];

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden border border-pink-main py-2 px-4  gap-2 text-white-main font-golos text-xs leading-none"
      >
        <span className="text-grey-second whitespace-nowrap">
          Сортування:&nbsp; {current.label}
        </span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden">
          <button
            type="button"
            aria-label="Закрити сортування"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative z-10 w-full rounded-t-2xl bg-background p-5 shadow-xl">
            <h2 className="mb-4 text-center text-sm font-bold uppercase tracking-wide">
              Сортування
            </h2>
            <ul role="listbox">
              {SORT_OPTIONS.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option.value === filters.sort}
                    onClick={() => {
                      setSort(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "block w-full rounded-md px-4 py-3 text-left text-sm cursor-pointer",
                      option.value === filters.sort
                        ? "bg-accent-soft font-semibold text-pink-main"
                        : "hover:bg-bg-muted"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
