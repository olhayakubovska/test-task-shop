import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}
