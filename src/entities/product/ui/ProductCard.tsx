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
    <article className="group flex flex-col">
      <div className="relative w-44 h-55.25 overflow-hidden bg-bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />
        {hasDiscount && <Badge className="absolute left-0 top-0">{discountPercent}% OFF</Badge>}
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute right-2 top-2 border-0 bg-white shadow-md w-7 h-7",
            isFavorite && "text-pink-main"
          )}
        >
          <HeartIcon filled={isFavorite} width={14} height={14} />
        </IconButton>
      </div>

      <div className="flex items-center justify-between pt-2.75 pb-2 px-1">
        <div className="flex flex-col gap-1">
          <h3 className="font-montserrat font-semibold text-[10px] leading-tight h-6 w-full max-w-25.25 tracking-[1px] uppercase overflow-hidden line-clamp-2 wrap-break-word">
            {product.name}
          </h3>

          <p className="font-golos font-normal text-[8px] h-5 tracking-[1px] text-grey-text uppercase">
            {product.line}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center  whitespace-nowrap">
          {hasDiscount ? (
            <>
              <span className="text-[8px] text-dark-main line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-[13px] font-semibold text-pink-main leading-none">
                {formatPrice(product.discountPrice!)}
              </span>
            </>
          ) : (
            <span className="text-[13px] font-semibold">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
