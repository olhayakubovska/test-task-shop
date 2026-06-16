"use client";

import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { cn } from "@/shared/lib/cn";

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, 2, 3, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(page);
  });

  return result;
}

export function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const { filters, setPage } = useCatalogFilters();
  const currentPage = filters.page;

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const target = Math.min(Math.max(1, page), totalPages);
    onPageChange?.(target);
    setPage(target);
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm whitespace-nowrap mx-auto max-w-76.25 md:mt-6" aria-label="Пагінація">
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="font-semibold text-[10px] uppercase tracking-wide text-dark-main disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-foreground"
      >
        Попередня
      </button>

      <div className="flex items-center  gap-3">
        {getPageNumbers(currentPage, totalPages).map((page, index) =>
          page === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="flex h-4 w-4 items-center justify-center text-text-muted">
              ...
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => goTo(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={cn(
                "flex h-4 w-4 items-center text-sm justify-center cursor-pointer font-bold",
                page === currentPage
                  ? "border-b-2 border-pink-main text-foreground"
                  : "text-text-muted hover:text-foreground",
              )}
            >
              {String(page).padStart(2, "0")}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="font-semibold text-[10px] uppercase tracking-wide text-dark-main disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-foreground"
      >
        Наступна
      </button>
    </nav>
  );
}
