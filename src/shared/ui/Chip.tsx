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
        "flex items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors cursor-pointer",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-foreground hover:border-foreground",
        className,
      )}
      {...props}
    />
  );
}
