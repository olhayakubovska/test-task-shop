import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center border  px-4.5 py-2.5 leading-none text-xs transition-colors cursor-pointer",
        active
          ? "border-foreground bg-foreground text-white font-bold"
          : "border-border bg-background text-foreground hover:border-foreground",
        className
      )}
      {...props}
    />
  );
}
