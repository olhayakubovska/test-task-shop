"use client";

import { useEffect, useState } from "react";
import type { ProductsQuery, ProductsResponse } from "@/shared/api/types";

interface UseProductsResult {
  data: ProductsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function buildProductsSearchParams(query: ProductsQuery): URLSearchParams {
  const params = new URLSearchParams();

  if (query.category) params.set("category", query.category);
  if (query.insoleSize) params.set("insoleSize", String(query.insoleSize));
  if (query.heelHeight) params.set("heelHeight", query.heelHeight);
  if (query.material) params.set("material", query.material);
  if (query.color) params.set("color", query.color);
  if (query.minPrice) params.set("minPrice", String(query.minPrice));
  if (query.maxPrice) params.set("maxPrice", String(query.maxPrice));
  if (query.sort) params.set("sort", query.sort);
  if (query.page) params.set("page", String(query.page));
  if (query.limit) params.set("limit", String(query.limit));

  return params;
}

export function useProducts(query: ProductsQuery): UseProductsResult {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resolvedKey, setResolvedKey] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const searchParams = buildProductsSearchParams(query).toString();
  const requestKey = `${searchParams}::${reloadToken}`;
  const isLoading = resolvedKey !== requestKey;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/products?${searchParams}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json() as Promise<ProductsResponse>;
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Невідома помилка");
      })
      .finally(() => {
        setResolvedKey(requestKey);
      });

    return () => controller.abort();
  }, [searchParams, reloadToken, requestKey]);

  return {
    data,
    isLoading,
    error,
    refetch: () => setReloadToken((token) => token + 1),
  };
}
