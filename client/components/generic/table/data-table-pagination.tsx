import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "~/components/ui/button";

import { DataTableRowsPerPageSelection } from "./data-table-rows-per-page-selection";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizes?: number[];
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
  label,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <Button
      variant="outline"
      className="size-8 p-0"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="sr-only">{label}</span>
      {children}
    </Button>
  );
};

export const DataTablePagination = <TData,>({
  table,
  pageSizes,
}: DataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between space-x-6 lg:space-x-8 ">
      <DataTableRowsPerPageSelection table={table} pageSizes={pageSizes} />

      <div className="flex flex-wrap">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium ">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <PaginationButton
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            label="Go to first page"
          >
            <ChevronsLeft />
          </PaginationButton>
          <PaginationButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            label="Go to previous page"
          >
            <ChevronLeft />
          </PaginationButton>

          <PaginationButton
            label="Go to next page"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </PaginationButton>
          <PaginationButton
            label="Go to last page"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
};
