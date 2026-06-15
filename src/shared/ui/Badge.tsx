import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white",
        className,
      )}
      {...props}
    />
  );
}
