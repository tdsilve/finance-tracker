"use client";
import React from "react";

import { Button } from "~/components/ui/button";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";


import { AccountsActionsProps } from './accounts-actions';
import { useDeleteAccountMutation } from "~/api/mutation/useDeleteAccountMutation";

type DeleteAmountDialogProps = {
  handleActionsClose: () => void;
} & AccountsActionsProps;

export const DeleteAccountDialog = React.forwardRef<
  HTMLDivElement,
  DeleteAmountDialogProps
>(({ id, name, handleActionsClose }, ref) => {
  const [open, setOpen] = React.useState(false);

  const deleteAccount = useDeleteAccountMutation({
    onSuccess: () => handleActionsClose(),
  });

  const handleDeleteAndClose = () => {
    deleteAccount.mutate([id]);
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
    handleActionsClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent ref={ref} className="bg-white lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <p>Are you sure you want to delete the account <span className="font-semibold">{name}?</span>  This action cannot be undone. </p>
        </DialogHeader>
        <Button variant="destructive" onClick={handleDeleteAndClose}>
          Delete
        </Button>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
});
