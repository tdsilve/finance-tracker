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
import { useDeleteTransactionMutation } from "~/api/mutation/useDeleteTransactionMutation";
import { Transaction } from "~/model/types";

type DeleteAmountDialogProps = {
  handleActionsClose: () => void;
  transaction: Transaction;
};

export const DeleteTransactionDialog = React.forwardRef<
  HTMLDivElement,
  DeleteAmountDialogProps
>(({ transaction, handleActionsClose }, ref) => {
  const [open, setOpen] = React.useState(false);

  const deleteAccount = useDeleteTransactionMutation({
    onSuccess: () => handleActionsClose(),
  });

  const handleDeleteAndClose = () => {
    deleteAccount.mutate([transaction._id]);
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
          <DialogTitle>Delete transaction</DialogTitle>
          <p>
            Are you sure you want to delete the transaction{" "}
            <span className="font-semibold">{transaction.name}?</span> This
            action cannot be undone.{" "}
          </p>
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
