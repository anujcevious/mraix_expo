import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BsThreeDots } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Printer,
  Settings,
  MoreVertical,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Icons from "@/components/ui/Icons";

export interface Column {
  id: string;
  header: string | React.ReactNode;
  accessor: string;
  isVisible?: boolean;
  cell?: (row: any) => React.ReactNode;
  sortable?: boolean;
}

interface BasicTableProps {
  columns: Column[];
  data: any[];
  onExport?: () => void;
  onPrint?: () => void;
  onSettings?: () => void;
  onView?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export const BasicTable = ({
  columns: initialColumns,
  data,
  onExport,
  onPrint,
  onSettings,
  onView,
  onEdit,
  onDelete,
}: BasicTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [columns, setColumns] = useState(initialColumns);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const toggleColumnVisibility = (columnId: string) => {
    setColumns((cols) =>
      cols.map((col) =>
        col.id === columnId ? { ...col, isVisible: !col.isVisible } : col,
      ),
    );
  };

  const handleSort = (columnId: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === columnId) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key: columnId, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const filteredData = sortedData.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const visibleColumns = columns.filter((col) => col.isVisible !== false);

  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={onExport}
            iconName="fileText"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={onPrint}
            iconName="printer"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={onSettings}
            iconName="settings"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="text-sm border-gray-200 rounded-lg w-10 h-10 flex items-center justify-center"
              >
                <Icons name="columns" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((column) => (
                <DropdownMenuItem
                  key={column.id}
                  onClick={() => toggleColumnVisibility(column.id)}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={column.isVisible !== false}
                      readOnly
                      className="h-4 w-4"
                    />
                    <span>
                      {typeof column.header === "string"
                        ? column.header
                        : column.id}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border bg-secondarytext/5">
        {/* Desktop View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-secondarytext/5 text-text">
              <TableRow>
                {visibleColumns.map((column) => (
                  <TableHead
                    key={column.id}
                    onClick={() =>
                      column.sortable && handleSort(column.accessor)
                    }
                    className={
                      column.sortable
                        ? "text-xxs cursor-pointer select-none"
                        : "text-xxs ml-2"
                    }
                  >
                    <div className="flex text-text items-center space-x-2">
                      <span>{column.header}</span>
                      {column.sortable && (
                        <Icons
                          name={
                            sortConfig?.key === column.accessor
                              ? sortConfig.direction === "asc"
                                ? "arrowUp"
                                : "arrowDown"
                              : "arrowUpDown"
                          }
                          className="h-4 w-4"
                        />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="text-secondarytext">
              {filteredData.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-primary/5  ">
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      className="px-2 py-1.5 text-xs text-secondarytext"
                    >
                      {column.id === "actions" ? (
                        <div className="flex justify-end  ">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 px-8 "
                              >
                                <BsThreeDots className="h-4 w-4 " />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="w-[160px]"
                            >
                              {onView && (
                                <DropdownMenuItem
                                  onClick={() => onView(row)}
                                  className="cursor-pointer"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  <span>View</span>
                                </DropdownMenuItem>
                              )}
                              {onEdit && (
                                <DropdownMenuItem
                                  onClick={() => onEdit(row)}
                                  className="cursor-pointer"
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                              )}
                              {onDelete && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => onDelete(row)}
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                  >
                                    <Trash className="h-4 w-4 mr-2" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : column.cell ? (
                        column.cell(row)
                      ) : (
                        row[column.accessor]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {filteredData.map((row, rowIndex) => (
            <div key={rowIndex} className="p-4 border-b last:border-b-0">
              {visibleColumns
                .filter((col) => col.id !== "actions")
                .map((column) => (
                  <div
                    key={column.id}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {column.header}
                    </span>
                    <span className="text-sm text-right">
                      {column.cell ? column.cell(row) : row[column.accessor]}
                    </span>
                  </div>
                ))}
              {(onView || onEdit || onDelete) && (
                <div className="flex justify-end mt-3 space-x-2">
                  {onView && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(row)}
                      iconName="eye"
                    />
                  )}
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(row)}
                      iconName="edit"
                    />
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(row)}
                      iconName="trash"
                      className="text-red-600"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
