import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center bg-pink-main p-2 text-[8px] font-semibold uppercase text-dark-main",
        className,
      )}
      {...props}
    />
  );
}
