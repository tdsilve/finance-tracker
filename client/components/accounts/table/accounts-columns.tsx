"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { Account } from "~/model/types";
import { Checkbox } from "~/components/ui/checkbox";

import { AccountsActions } from "./columns/column-actions";
import { ColumnStatus } from "./columns/column-status";
import { DataTableColumnSorted } from "~/components/generic/table/data-table-column-sorted";

export const columns: ColumnDef<Account>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnSorted
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        isDesc={column.getIsSorted() === "desc"}
      >
        Name
      </DataTableColumnSorted>
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] overflow-hidden text-ellipsis pl-3 capitalize">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnSorted
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        isDesc={column.getIsSorted() === "desc"}
      >
        Amount
      </DataTableColumnSorted>
    ),
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <div className="pl-3">
          <span className="mr-1">$</span>
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <ColumnStatus val={row.original.amount} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;

      return <AccountsActions id={account._id} name={account.name} />;
    },
  },
];
