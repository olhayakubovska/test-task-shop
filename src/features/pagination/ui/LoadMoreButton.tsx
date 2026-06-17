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
    <div className="flex justify-center mt-6">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="w-full max-w-59.25 md:max-w-65.75 border border-dark-main bg-transparent font-medium tracking-[0.04em] text-xs text-dark-main px-10 py-3 rounded-none md:text-sm md:leading-none md:h-10.25 hover:bg-dark-main hover:text-white-main"
      >
        {isLoading ? <Spinner className="h-4 w-4" /> : `Показати ще ${remaining} товари`}
      </Button>
    </div>
  );
}
