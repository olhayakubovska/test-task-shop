import type { CatalogCardsResponse, CatalogQuery } from "./types";

const BASE_URL = "http://test-woh.keykey.com.ua/v1";

export async function fetchCatalogCards(query: CatalogQuery): Promise<CatalogCardsResponse> {
  const params = new URLSearchParams();

  if (query.categoryId) params.set("categoryId", query.categoryId);
  if (query.priceMin != null) params.set("priceMin", String(query.priceMin));
  if (query.priceMax != null) params.set("priceMax", String(query.priceMax));
  if (query.sort) params.set("sort", query.sort);
  if (query.char && Object.keys(query.char).length > 0) {
    params.set("char", JSON.stringify(query.char));
  }
  params.set("page", String(query.page ?? 1));
  params.set("limit", String(query.limit ?? 24));

  const res = await fetch(`${BASE_URL}/catalog/cards?${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<CatalogCardsResponse>;
}
