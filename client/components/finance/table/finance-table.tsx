import React from "react";
import { Finance } from "~/model/types";
import { Params } from "~/model/types";
import { columns } from "./columns/finance-columns";
import {
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "~/components/generic/table/data-table";
import { PaginationState } from "@tanstack/react-table";
import { Flex } from "~/components/generic/flex";
import { DataTableSearchInput } from "~/components/generic/table/data-table-search-input";
import { DataTableDeleteRowsButton } from "~/components/generic/table/data-table-delete-rows-button";
import { useDeleteFinanceMutation } from "~/api/mutation/useDeleteFinanceMutation";
import { DataTablePagination } from "~/components/generic/table/data-table-pagination";

type FinanceTableProps = {
  data: Finance[];
  totalPages: number;
  params: Params;
  setParams: (val: Params) => void;
};

export const FinanceTable = ({
  data,
  totalPages,
  params,
  setParams,
}: FinanceTableProps) => {
  const deleteFinance = useDeleteFinanceMutation({
    onSuccess: () => resetTable(),
    onError: () => resetTable(),
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: params.pageParam - 1,
    pageSize: params.limit,
  });
  React.useEffect(() => {
    setParams({
      limit: pagination.pageSize,
      pageParam: pagination.pageIndex + 1,
    });
  }, [pagination, setParams]);
  const totalPg = totalPages === 0 ? 1 : totalPages;
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: totalPg,
    rowCount: data.length,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      setPagination((prevPagination) => {
        const newPagination =
          typeof updater === "function" ? updater(prevPagination) : updater;

        return newPagination;
      });
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
      pagination,
    },
  });
  const handleClickDeleteFinance = () => {
    deleteFinance.mutate(
      table.getSelectedRowModel().rows.map((row) => row.original._id),
    );
  };
  const resetTable = () => {
    table.reset();
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };
  return (
    <>
      <Flex items="center" justify="between" className=" p-4" wrap>
        <DataTableSearchInput
          placeholder="Search finance..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(val) => table.getColumn("name")?.setFilterValue(val)}
        />
        <DataTableDeleteRowsButton
          label={`Delete finance(s) (${table.getFilteredSelectedRowModel().rows.length})`}
          onClick={handleClickDeleteFinance}
          disabled={table.getFilteredSelectedRowModel().rows.length == 0}
        />
      </Flex>
      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </>
  );
};
