"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@/shared/ui/IconButton";
import { HeartIcon } from "@/shared/ui/icons";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import type { CatalogCard } from "@/shared/api/types";

interface ProductCardProps {
  product: CatalogCard;
  imageClassName?: string;
  infoClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  priceClassName?: string;
  favoriteClassName?: string;
}

export function ProductCard({
  product,
  imageClassName,
  infoClassName,
  titleClassName,
  descriptionClassName,
  priceClassName,
  favoriteClassName,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const name = product.title?.ua ?? product.title?.en ?? "";
  const subtitle = product.subtitle?.ua ?? product.subtitle?.en ?? "";
  const price = product.pricing?.min ?? 0;

  return (
    <article className="group flex flex-col">
      <div
        className={cn(
          "relative w-44 h-55.25 md:w-56 md:h-70.25 overflow-hidden bg-bg-muted",
          imageClassName
        )}
      >
        <Image
          src={product.imageURL || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw"
          unoptimized
        />
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute right-2 top-2 border-0 bg-white shadow-md w-7 h-7 md:w-8 md:h-8 md:top-3 md:right-3",
            isFavorite && "text-pink-main",
            favoriteClassName
          )}
        >
          <HeartIcon filled={isFavorite} width={14} height={14} />
        </IconButton>
      </div>

      <div
        className={cn(
          "flex items-center justify-between pt-2.75 pb-2 px-1  md:p-2",
          infoClassName
        )}
      >
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3
            className={cn(
              "font-montserrat font-semibold text-[10px] leading-3 tracking-[1px] uppercase line-clamp-2 md:line-clamp-1",
              titleClassName
            )}
          >
            {name}
          </h3>

          <p
            className={cn(
              "font-golos font-normal text-[8px] tracking-[1px] leading-2.5 text-grey-text uppercase line-clamp-2 3xl:line-clamp-1",
              descriptionClassName
            )}
          >
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap">
          <span className={cn("text-[13px] font-semibold", priceClassName)}>
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </article>
  );
}
