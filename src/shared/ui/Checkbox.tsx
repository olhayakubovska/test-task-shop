import { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className, checked, ...props }: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 text-sm",
        checked ? "font-semibold text-accent" : "text-foreground",
        className,
      )}
    >
      <input type="checkbox" checked={checked} className="peer sr-only" {...props} />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
          checked ? "border-accent bg-accent" : "border-border bg-background",
        )}
      >
        {checked && (
          <svg viewBox="0 0 16 16" className="h-3 w-3 fill-none stroke-white stroke-[2.5]">
            <path d="M3 8.5L6.5 12L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}
