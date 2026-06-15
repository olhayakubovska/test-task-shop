import { Button } from "@/shared/ui/Button";
import { Spinner } from "@/shared/ui/Spinner";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  remaining: number;
}

export function LoadMoreButton({ onClick, isLoading, remaining }: LoadMoreButtonProps) {
  if (remaining <= 0) return null;

  return (
    <div className="flex justify-center py-4">
      <Button variant="outline" onClick={onClick} disabled={isLoading} className="min-w-64">
        {isLoading ? <Spinner className="h-4 w-4" /> : `Показати ще ${remaining} товари`}
      </Button>
    </div>
  );
}
