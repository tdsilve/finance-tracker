"use client";
import {
  SortingState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import React from "react";

import { DataTableSearchInput } from "../../generic/table/data-table-search-input";
import { Account } from "~/model/types";
import { columns } from "./accounts-columns";
import { DataTable } from "~/components/generic/table/data-table";
import { DataTablePagination } from "~/components/generic/table/data-table-pagination";
import { Flex } from "~/components/generic/flex";
import { DataTableDeleteRowsButton } from "~/components/generic/table/data-table-delete-rows-button";
import { useDeleteAccountMutation } from "~/api/mutation/useDeleteAccountMutation";

interface DataTableProps {
  data: Account[];
  totalPages: number;
  currentPage: number;
}

export const AccountsTable = ({ data , totalPages, currentPage}: DataTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });
  const resetTable = () => {
    table.reset();
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };
  const deleteAccounts = useDeleteAccountMutation({
    onSuccess: () => resetTable(),
    onError: () => resetTable(),
  });
  const handleClickDeleteAccounts = () => {
    deleteAccounts.mutate(
      table.getSelectedRowModel().rows.map((row) => row.original._id),
    );
  };

  return (
    <>
      <Flex items="center" justify="between" className=" p-4">
        <DataTableSearchInput
          placeholder="Search by account..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(val) => table.getColumn("name")?.setFilterValue(val)}
        />
        <DataTableDeleteRowsButton
          label={`Delete account(s) (${table.getFilteredSelectedRowModel().rows.length})`}
          onClick={handleClickDeleteAccounts}
          disabled={table.getFilteredSelectedRowModel().rows.length == 0}
        />
      </Flex>

      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </>
  );
};
