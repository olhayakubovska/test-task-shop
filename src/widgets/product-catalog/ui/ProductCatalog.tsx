"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/entities/product/api/useProducts";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { ProductCardSkeleton } from "@/entities/product/ui/ProductCardSkeleton";
import { ActiveFiltersBar } from "@/features/product-filters/ui/ActiveFiltersBar";
import { FilterSidebar } from "@/features/product-filters/ui/FilterSidebar";
import { MobileFilterDrawer } from "@/features/product-filters/ui/MobileFilterDrawer";
import { LoadMoreButton } from "@/features/pagination/ui/LoadMoreButton";
import { Pagination } from "@/features/pagination/ui/Pagination";
import { SortDropdown } from "@/features/product-sort/ui/SortDropdown";
import { MobileSortSheet } from "@/features/product-sort/ui/MobileSortSheet";
import { PAGE_SIZE } from "@/shared/config/filters";
import { EmptyState } from "@/shared/ui/EmptyState";
import { ErrorState } from "@/shared/ui/ErrorState";
import { Button } from "@/shared/ui/Button";
import { useCatalogFilters } from "@/shared/lib/useCatalogFilters";
import type { Product } from "@/shared/api/types";

export function ProductCatalog() {
  const { filters, clearAll, setPage } = useCatalogFilters();
  const { data, isLoading, error, refetch } = useProducts({
    category: filters.category,
    insoleSize: filters.insoleSize,
    heelHeight: filters.heelHeight,
    material: filters.material,
    color: filters.color,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    sort: filters.sort,
    page: filters.page,
    limit: PAGE_SIZE,
  });

  const [items, setItems] = useState<Product[]>([]);
  const [isAppendPending, setIsAppendPending] = useState(false);
  const isAppendingRef = useRef(false);

  useEffect(() => {
    if (!data) return;
    if (isAppendingRef.current) {
      setItems((prev) => [...prev, ...data.items]);
      isAppendingRef.current = false;
      setIsAppendPending(false);
    } else {
      setItems(data.items);
    }
  }, [data]);

  const handleLoadMore = () => {
    isAppendingRef.current = true;
    setIsAppendPending(true);
    setPage(filters.page + 1);
  };

  const handlePageChange = () => {
    isAppendingRef.current = false;
    setIsAppendPending(false);
  };

  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const remaining = Math.min(PAGE_SIZE, Math.max(0, total - items.length));
  const isInitialLoading = isLoading && items.length === 0;
  const isLoadingMore = isLoading && isAppendPending;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <p className="mb-3 text-xs uppercase tracking-wide text-text-muted">
        <Link href="/catalog" className="hover:text-accent">Головна</Link> / <span className="text-accent">Каталог взуття</span>
      </p>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">Каталог взуття</h1>
        <div className="hidden lg:block">
          <SortDropdown />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3 lg:hidden">
        <MobileFilterDrawer categoryCounts={data?.categoryCounts} total={total} />
        <MobileSortSheet />
      </div>

      <ActiveFiltersBar />

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar categoryCounts={data?.categoryCounts} />
        </div>

        <div>
          {error ? (
            <ErrorState onRetry={refetch} />
          ) : isInitialLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <EmptyState
              title="Товарів не знайдено"
              description="Спробуйте змінити або скинути фільтри, щоб побачити більше товарів."
              action={
                <Button variant="outline" onClick={clearAll}>
                  Очистити фільтри
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <LoadMoreButton onClick={handleLoadMore} isLoading={isLoadingMore} remaining={remaining} />
              <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
