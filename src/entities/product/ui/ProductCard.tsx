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
  imageClassName?: string;
  infoClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  priceClassName?: string;
  discountClassName?: string;
  favoriteClassName?: string;
}

export function ProductCard({ product, imageClassName, infoClassName, titleClassName, descriptionClassName, priceClassName, discountClassName, favoriteClassName }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const hasDiscount = typeof product.discountPrice === "number";
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.discountPrice! / product.price) * 100)
    : 0;

  return (
    <article className="group flex flex-col">
      <div className={cn("relative w-44 h-55.25 md:w-56 md:h-70.25 overflow-hidden bg-bg-muted", imageClassName)}>
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
            isFavorite && "text-pink-main",
            favoriteClassName
          )}
        >
          <HeartIcon filled={isFavorite} width={14} height={14} />
        </IconButton>
      </div>

      <div className={cn("flex items-center justify-between pt-2.75 pb-2 px-1 md:p-2", infoClassName)}>
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className={cn("font-montserrat font-semibold text-[10px] leading-tight h-6 w-full max-w-25.25 tracking-[1px] uppercase overflow-hidden line-clamp-2 wrap-break-word md:h-auto md:max-w-none", titleClassName)}>
            {product.name}
          </h3>

          <p className={cn("font-golos font-normal text-[8px] h-5 tracking-[1px] text-grey-text uppercase md:max-w-35.25 md:leading-2.5", descriptionClassName)}>
            {product.line}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap">
          {hasDiscount ? (
            <>
              <span className={cn("text-[8px] text-dark-main line-through", discountClassName)}>
                {formatPrice(product.price)}
              </span>
              <span className={cn("text-[13px] font-semibold text-pink-main leading-none", priceClassName)}>
                {formatPrice(product.discountPrice!)}
              </span>
            </>
          ) : (
            <span className={cn("text-[13px] font-semibold", priceClassName)}>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
