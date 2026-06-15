import { cn } from "@/shared/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent",
        className,
      )}
      role="status"
      aria-label="Завантаження"
    />
  );
}
