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
        "flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer",
        active ? "fond-semibold" : "border-border",
        className,
      )}
      {...props}
    >
      <span
        className="h-4 w-4 border border-border"
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}
