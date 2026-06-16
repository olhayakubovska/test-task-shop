export function ProductCardSkeleton() {
  return (
    <article className="flex flex-col">
     <div className="w-44 h-55.25 md:w-56 md:h-70.25 3xl:w-89.25 3xl:h-112.25 animate-pulse bg-gray-200 shrink-0" />

      <div className="flex items-center justify-between pt-2.75 pb-2 px-1 md:p-2 3xl:p-3">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-2.5 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-3.5 w-12 animate-pulse rounded bg-gray-200 ml-2 shrink-0" />
      </div>
    </article>
  );
}
