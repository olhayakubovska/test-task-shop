"use client";

import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import { ChevronLeftIcon, ChevronRightIcon } from "@/shared/ui/icons";
import { cn } from "@/shared/lib/cn";

interface PaginationProps {
  totalPages: number;
  onPageChange?: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
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
    <nav className="flex flex-wrap items-center justify-center gap-2 py-8 text-sm" aria-label="Пагінація">
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-2 py-1 font-bold uppercase tracking-wide text-text-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-foreground"
      >
        <ChevronLeftIcon />
        Попередня
      </button>

      {getPageNumbers(currentPage, totalPages).map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className="px-2 text-text-muted">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full cursor-pointer",
              page === currentPage
                ? "bg-foreground font-bold text-background"
                : "text-text-muted hover:text-foreground",
            )}
          >
            {String(page).padStart(2, "0")}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-2 py-1 font-bold uppercase tracking-wide text-text-muted disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:text-foreground"
      >
        Наступна
        <ChevronRightIcon />
      </button>
    </nav>
  );
}
