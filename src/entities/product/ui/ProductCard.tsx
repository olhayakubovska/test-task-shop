"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/Badge";
import { IconButton } from "@/shared/ui/IconButton";
import { HeartIcon } from "@/shared/ui/icons";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import type { Product } from "@/entities/product/model/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const hasDiscount = typeof product.discountPrice === "number";
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.discountPrice! / product.price) * 100)
    : 0;

  return (
    <article className="group flex flex-col gap-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md bg-bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
        {hasDiscount && (
          <Badge className="absolute left-3 top-3">-{discountPercent}%</Badge>
        )}
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute right-3 top-3 bg-white/90",
            isFavorite && "text-accent",
          )}
        >
          <HeartIcon filled={isFavorite} />
        </IconButton>
      </div>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide">{product.name}</h3>
          <p className="text-xs uppercase tracking-wide text-text-muted">{product.line}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end text-sm font-semibold whitespace-nowrap">
          {hasDiscount ? (
            <>
              <span className="text-accent">{formatPrice(product.discountPrice!)}</span>
              <span className="text-xs text-text-muted line-through">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
