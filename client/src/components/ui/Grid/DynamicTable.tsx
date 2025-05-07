
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Printer, Menu, SortAsc, MoreVertical, Edit, Trash } from "lucide-react";
import Icons from "@/components/ui/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Column {
  accessorKey: string;
  header: string;
  cell?: (row: any) => React.ReactNode;
  isVisible?: boolean;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  showActions?: boolean;
}

export function DynamicTable({
  columns,
  data,
  onEdit,
  onDelete,
  showActions = true,
}: TableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.accessorKey)
  );

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const toggleColumnVisibility = (accessorKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(accessorKey)
        ? prev.filter((key) => key !== accessorKey)
        : [...prev, accessorKey]
    );
  };

  return (
    <div className="space-y-4 p-2">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 h-10 bg-white border-gray-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-10">
                <Icons name="columns" className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.accessorKey}
                  checked={visibleColumns.includes(column.accessorKey)}
                  onCheckedChange={() =>
                    toggleColumnVisibility(column.accessorKey)
                  }
                >
                  {column.header}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="h-10">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" className="h-10">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="p-2">
                <div className="mb-2">
                  <p className="text-sm font-medium mb-2">Column Visibility</p>
                  {columns.map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.accessorKey}
                      checked={visibleColumns.includes(column.accessorKey)}
                      onCheckedChange={() => toggleColumnVisibility(column.accessorKey)}
                    >
                      {column.header}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SortAsc className="h-4 w-4 mr-2" />
                  Sort Columns
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50">
                  {columns
                    .filter((column) => visibleColumns.includes(column.accessorKey))
                    .map((column) => (
                      <TableHead
                        key={column.accessorKey}
                        className="font-semibold text-sm text-gray-600"
                      >
                        {column.header}
                      </TableHead>
                    ))}
                  {showActions && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {columns
                      .filter((column) =>
                        visibleColumns.includes(column.accessorKey)
                      )
                      .map((column) => (
                        <TableCell key={column.accessorKey}>
                          {column.cell ? column.cell(row) : row[column.accessorKey]}
                        </TableCell>
                      ))}
                    {showActions && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(row)}
                            >
                              Edit
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(row)}
                              className="text-red-600"
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {paginatedData.map((row, rowIndex) => (
          <Card key={rowIndex} className="p-4">
            <div className="space-y-3">
              {columns
                .filter((column) => visibleColumns.includes(column.accessorKey))
                .map((column) => (
                  <div
                    key={column.accessorKey}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-500">
                      {column.header}
                    </span>
                    <span className="text-sm">
                      {column.cell ? column.cell(row) : row[column.accessorKey]}
                    </span>
                  </div>
                ))}
              {showActions && (
                <div className="flex justify-end pt-2 border-t">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(row)}>
                          <Edit className="h-4 w-4 mr-2" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem 
                          onClick={() => onDelete(row)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t border-gray-200">
        {/* Desktop pagination */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show rows:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={250}>250</option>
            </select>
            <span className="text-sm text-gray-600">
              {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of{" "}
              {filteredData.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Mobile pagination */}
        <div className="md:hidden flex justify-between items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <Icons name="chevronLeft" className="h-4 w-4" />
          </Button>
          <span className="text-xs text-gray-600">
            {startIndex + 1} - {Math.min(endIndex, filteredData.length)} of{" "}
            {filteredData.length}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <Icons name="chevronRight" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DynamicTable;
