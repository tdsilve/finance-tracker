import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { RiMoreLine } from "react-icons/ri";
import { Account } from "~/model/types";

import { EditAccountDialog } from "./edit-accounts-dialog";
import { DeleteAccountDialog } from "./delete-accounts-dialog";

export type AccountsActionsProps = {
  id: Account["_id"];
  name: Account["name"];
};

export const AccountsActions = ({ id, name }: AccountsActionsProps) => {
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
        className="flex flex-col text-center font-medium"
      >
        <DropdownMenuItem asChild>
          <EditAccountDialog id={id} handleActionsClose={handleClose} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DeleteAccountDialog
            id={id}
            name={name}
            handleActionsClose={handleClose}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
