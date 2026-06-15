import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full  bg-background text-foreground transition-colors  cursor-pointer",
        className
      )}
      {...props}
    />
  );
}
