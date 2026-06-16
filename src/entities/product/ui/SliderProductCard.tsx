"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/shared/ui/Badge";
import { IconButton } from "@/shared/ui/IconButton";
import { HeartIcon } from "@/shared/ui/icons";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import type { Product } from "@/entities/product/model/types";

interface SliderProductCardProps {
  product: Product;
}

export function SliderProductCard({ product }: SliderProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const hasDiscount = typeof product.discountPrice === "number";
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.discountPrice! / product.price) * 100)
    : 0;

  return (
    <article className="group flex flex-col">
      <div className="relative w-40 h-50.75 md:w-40.5 md:h-50.75 overflow-hidden bg-bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 162px"
        />
        {hasDiscount && (
          <Badge className="font-montserrat absolute left-0 top-0 h-3.75 w-10.5 flex justify-center items-center font-semibold text-[6px] leading-none whitespace-nowrap">
            {discountPercent}% OFF
          </Badge>
        )}
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute right-2 top-2 border-0 bg-white shadow-md w-6 h-6",
            isFavorite && "text-pink-main"
          )}
        >
          <HeartIcon filled={isFavorite} width={12} height={12} className="" />
        </IconButton>
      </div>

      <div className="flex items-end justify-between p-2">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className="font-montserrat font-semibold text-[8px] leading-none tracking-[1px] uppercase overflow-hidden line-clamp-2">
            {product.name}
          </h3>
          <p className="font-golos font-normal text-[6px] leading-2 tracking-[1px] text-grey-text uppercase">
            {product.line}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap">
          {hasDiscount ? (
            <>
              <span className="font-montserrat font-medium text-[7px] leading-2.5 text-dark-main line-through">
                {formatPrice(product.price)}
              </span>
              <span className="font-montserrat font-semibold text-[10px] leading-none text-pink-main">
                {formatPrice(product.discountPrice!)}
              </span>
            </>
          ) : (
            <span className="font-montserrat font-semibold text-[10px] leading-none">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
