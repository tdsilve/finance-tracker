"use client";
import React from "react";

import { Button } from "~/components/ui/button";

import { Account } from "~/model/types";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Flex } from "~/components/generic/flex";
import { useEditAccountMutation } from "~/api/mutation/useEditAccountMutation";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountSchema } from "~/model/schemas";
import { Form } from "../../../ui/form";

import { AccountsActionsProps } from "./accounts-actions";

type EditAmountDialogProps = {
  handleActionsClose: () => void;
} & AccountsActionsProps;

export const EditAccountDialog = React.forwardRef<
  HTMLDivElement,
  EditAmountDialogProps
>(({ id, name, handleActionsClose }, ref) => {
  const [open, setOpen] = React.useState(false);

  const updateAccount = useEditAccountMutation({
    onSuccess: () => handleActionsClose(),
  });

  const handleClose = () => {
    setOpen(false);
    handleActionsClose();
  };

  const form = useForm({
    resolver: zodResolver(AccountSchema),
    defaultValues: { name, _id: id, amount: 0 },
  });

  const onSubmit = (data: Account) => {
    updateAccount.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent ref={ref} className="bg-white lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Edit the amount of {name}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex gap={4} items="center">
              <FormFieldWrapper
                control={form.control}
                name={"amount"}
                label={"Amount"}
                className="flex flex-col"
                renderInput={(field) => (
                  <Input {...field} type="number" placeholder="e.g. 100" />
                )}
              />
            </Flex>

            <DialogFooter className="gap-2">
              <Flex gap={2} items="center" className="m-2">
                <Button type="submit">Save changes</Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Flex>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
});
