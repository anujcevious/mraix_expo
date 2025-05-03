import React from 'react';
import { cn } from '@/lib/utils';

interface MobileTableCardProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

function MobileTableCard<T>({
  data,
  renderItem,
  className,
  isLoading = false,
  emptyMessage = "No data available",
  onLoadMore,
  hasMore = false
}: MobileTableCardProps<T>) {
  const isEmpty = !isLoading && (!data || data.length === 0);

  return (
    <div className={cn("md:hidden space-y-4", className)}>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <svg
            className="animate-spin h-6 w-6 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {isEmpty && (
        <div className="text-center py-8 text-muted-foreground">
          {emptyMessage}
        </div>
      )}

      {!isLoading && data.map((item, index) => (
        <React.Fragment key={index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}

      {onLoadMore && hasMore && (
        <div className="text-center py-4">
          <button
            className="text-primary text-sm hover:underline focus:outline-none"
            onClick={onLoadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default MobileTableCard;
