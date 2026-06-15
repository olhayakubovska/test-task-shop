import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hex: string;
  label: string;
  active?: boolean;
}

export function ColorSwatch({ hex, label, active, className, ...props }: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors cursor-pointer",
        active ? "border-foreground" : "border-border hover:border-foreground",
        className,
      )}
      {...props}
    >
      <span
        className="h-4 w-4 rounded-sm border border-border"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}
