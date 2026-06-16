"use client";

import { useState } from "react";
import Image from "next/image";
import { IconButton } from "@/shared/ui/IconButton";
import { HeartIcon } from "@/shared/ui/icons";
import { formatPrice } from "@/shared/lib/format";
import { cn } from "@/shared/lib/cn";
import type { CatalogCard } from "@/shared/api/types";

interface SliderProductCardProps {
  product: CatalogCard;
}

export function SliderProductCard({ product }: SliderProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const name = product.title?.ua ?? product.title?.en ?? "";
  const subtitle = product.subtitle?.ua ?? product.subtitle?.en ?? "";
  const price = product.pricing?.min ?? 0;

  return (
    <article className="group flex flex-col">
      <div className="relative w-40 h-50.75 md:w-40.5 md:h-50.75 3xl:w-full 3xl:h-auto 3xl:aspect-162/203 overflow-hidden bg-bg-muted">
        <Image
          src={product.imageURL || "/placeholder.jpg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 162px"
          unoptimized
        />
        <IconButton
          aria-label={isFavorite ? "Видалити з обраного" : "Додати в обране"}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((prev) => !prev)}
          className={cn(
            "absolute right-2 top-2 border-0 bg-white shadow-md w-6 h-6",
            isFavorite && "text-pink-main"
          )}
        >
          <HeartIcon filled={isFavorite} width={12} height={12} />
        </IconButton>
      </div>

      <div className="flex items-end justify-between p-2 gap-2">
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className="font-montserrat font-semibold text-[8px] leading-none tracking-[1px] uppercase overflow-hidden line-clamp-2">
            {name}
          </h3>
          <p className="font-golos font-normal text-[6px] leading-2 tracking-[1px] text-grey-text uppercase line-clamp-2">
            {subtitle}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end justify-center whitespace-nowrap">
          <span className="font-montserrat font-semibold text-[10px] leading-none">
            {formatPrice(price)}
          </span>
        </div>
      </div>
    </article>
  );
}
