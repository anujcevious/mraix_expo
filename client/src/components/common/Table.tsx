import React from 'react';
import { 
  Table as ShadcnTable, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T>({
  data,
  columns,
  onRowClick,
  className,
  isLoading = false,
  emptyMessage = "No data available"
}: TableProps<T>) {
  const isEmpty = !isLoading && (!data || data.length === 0);

  return (
    <div className={cn("hidden md:block overflow-x-auto", className)}>
      <ShadcnTable className="w-full bg-white rounded-lg border border-border shadow-sm">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index} 
                className={cn(
                  "px-4 py-3 text-sm font-medium text-gray-500 border-b border-border",
                  column.className
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 text-primary"
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
              </TableCell>
            </TableRow>
          )}

          {isEmpty && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            data.map((item, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={cn(
                  "border-b border-border hover:bg-gray-50",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell 
                    key={`${rowIndex}-${colIndex}`} 
                    className="px-4 py-3 text-sm"
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </ShadcnTable>
    </div>
  );
}

export default Table;
