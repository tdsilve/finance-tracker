import React from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Payment } from '~/model/types'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'

import { RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri'

export const  PaymentColumns: ColumnDef<Payment>[] = [
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
    )
  },
 
    {
      accessorKey: "name",
      header: "Name",
      cell: ({row}) => {
        return <div className='capitalize'>{row.original.name}</div>
      }
    },
    {
      accessorKey: "amount",
      enableSorting: true,
      cell: ({row}) => {
        return <div >$ {row.original.amount}</div>
      },
      header: ({ column }) => {
        const isAscending = column.getIsSorted() === "asc";
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Ammount
           {isAscending ? <RiArrowUpLine className="ml-1 h-4 w-4" /> : <RiArrowDownLine className="ml-2 h-4 w-4" />}
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({row}) => {
        return <div className='capitalize'>{row.original.status}</div>
      }
    },
    {
      accessorKey: "email",
      header: "Email",
    }

  ]
