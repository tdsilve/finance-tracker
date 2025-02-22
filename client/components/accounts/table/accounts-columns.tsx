"use client";
import { ColumnDef } from "@tanstack/react-table";

import React from "react";
import { Account } from "~/model/types";
import { RiArrowUpLine } from "react-icons/ri";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import { cn } from "~/lib/css";
import { AccountsActions } from "./accounts-actions";

enum BankAccountStatus {
  Negative = "🔴",
  Positive = "🟢",
  Zero = "🟡",
}

function getStatus(amount: number) {
  if (amount > 0) return BankAccountStatus.Positive;
  if (amount < 0) return BankAccountStatus.Negative;
  return BankAccountStatus.Zero;
}

const Column = ({
  children,
  onClick,
  isDesc,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  isDesc?: boolean;
}) => {
  if (!onClick) return <div>{children}</div>;
  return (
    <Button onClick={onClick} variant={"ghost"}>
      {children}{" "}
      <span className={cn(isDesc && "rotate-180 animate")}>
        <RiArrowUpLine />
      </span>{" "}
    </Button>
  );
};

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
      <Column
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        isDesc={column.getIsSorted() === "desc"}
      >
        Name
      </Column>
    ),
    cell: ({ row }) => (
      <div className="max-w-[150px] overflow-hidden text-ellipsis capitalize ">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Column
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        isDesc={column.getIsSorted() === "desc"}
      >
        Amount
      </Column>
    ),
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <div>
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
      const status = getStatus(row.original.amount);
      return <div>{status}</div>;
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
