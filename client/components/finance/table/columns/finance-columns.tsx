import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Finance } from "~/model/types";
import { ColumnDate } from "./column-date";
import { ColumnCategory } from "./column-category";
import { Checkbox } from "~/components/ui/checkbox";

import { DataTableColumnSorted } from "~/components/generic/table/data-table-column-sorted";
import { getStringOrNumberToDate } from "~/lib/date";
import { ColumnActions } from "./column-actions";

export const columns: ColumnDef<Finance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <DataTableColumnSorted
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isDesc={column.getIsSorted() === "desc"}
        >
          Date
        </DataTableColumnSorted>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div className="px-3">
          <ColumnDate date={getStringOrNumberToDate(date)} />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnSorted
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isDesc={column.getIsSorted() === "desc"}
        >
          Name
        </DataTableColumnSorted>
      );
    },

    cell: ({ row }) => (
      <div className="max-w-[150px] overflow-hidden text-ellipsis pl-3 capitalize">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <DataTableColumnSorted
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isDesc={column.getIsSorted() === "desc"}
        >
          Amount
        </DataTableColumnSorted>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="pl-3">
          <span className="mr-1">$</span>
          {row.original.amount}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <DataTableColumnSorted
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isDesc={column.getIsSorted() === "desc"}
        >
          Category
        </DataTableColumnSorted>
      );
    },
    cell: ({ row }) => {
      return <ColumnCategory category={row.original.category} />;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return (
        <DataTableColumnSorted
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          isDesc={column.getIsSorted() === "desc"}
        >
          Notes
        </DataTableColumnSorted>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.notes}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const finance = row.original;
      return <ColumnActions finance={finance} />;
    },
  },
];
