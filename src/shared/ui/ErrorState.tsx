import { Button } from "@/shared/ui/Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Не вдалося завантажити товари",
  description = "Спробуйте оновити сторінку або повторіть спробу пізніше.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-md text-sm text-text-muted">{description}</p>
      {onRetry && (
        <Button onClick={onRetry}>
          Спробувати ще раз
        </Button>
      )}
    </div>
  );
}
