"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { RiMoreLine } from "react-icons/ri";

type DataTableColumnActionProps = {
  items: ({
    handleClose,
    handleOpen,
  }: {
    handleClose: () => void;
    handleOpen: () => void;
  }) => React.ReactNode[];
};

export const DataTableColumnAction = ({
  items,
}: DataTableColumnActionProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0" onClick={handleOpen}>
          <span className="sr-only">Open menu</span>
          <RiMoreLine className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="flex flex-col text-center font-medium "
      >
        {items({ handleClose, handleOpen })?.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
