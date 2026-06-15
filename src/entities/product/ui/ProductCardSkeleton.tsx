export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="aspect-[3/4] w-full animate-pulse bg-bg-muted" />
      <div className="space-y-2">
        <div className="h-3 w-3/4 animate-pulse rounded bg-bg-muted" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-bg-muted" />
      </div>
    </div>
  );
}
