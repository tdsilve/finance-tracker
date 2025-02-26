import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Table } from "@tanstack/react-table";
import { Flex } from "../flex";

type DataTableRowsPerPageSelectionProps<TData> = {
  table: Table<TData>;
  pageSizes?: number[];
  label?: string;
};
export const DataTableRowsPerPageSelection = <TData,>({
  table,
  pageSizes = [5, 10, 20, 30, 40, 50],
  label = "Rows per page",
}: DataTableRowsPerPageSelectionProps<TData>) => {
  return (
    <Flex className="space-x-2" items="center">
      <p className="text-sm font-medium">{label}</p>
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="h-8 w-[70px]">
          <SelectValue placeholder={table.getState().pagination.pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {pageSizes?.map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Flex>
  );
};
