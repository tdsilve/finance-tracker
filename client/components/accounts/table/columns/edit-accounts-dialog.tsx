"use client";
import React from "react";

import { Button } from "~/components/ui/button";

import { EditAccount } from "~/model/types";

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
import { EditAccountSchema } from "~/model/schemas";
import { Form } from "../../../ui/form";
import { Account } from "~/model/types";

type EditAmountDialogProps = {
  handleActionsClose: () => void;
  id: Account["_id"];
};

export const EditAccountDialog = React.forwardRef<
  HTMLDivElement,
  EditAmountDialogProps
>(({ id, handleActionsClose }, ref) => {
  const [open, setOpen] = React.useState(false);

  const updateAccount = useEditAccountMutation({
    onSuccess: () => handleActionsClose(),
  });

  const handleClose = () => {
    setOpen(false);
    handleActionsClose();
  };

  const form = useForm({
    resolver: zodResolver(EditAccountSchema),
    defaultValues: { name: "", _id: id, amount: "" },
  });

  const onSubmit = (data: EditAccount) => {
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
          <DialogTitle> Edit account </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex gap={4} items="center" col>
              <FormFieldWrapper
                control={form.control}
                name={"name"}
                label={"New name"}
                className="flex flex-col"
                renderInput={(field) => (
                  <Input {...field} placeholder={"Enter name"} />
                )}
              />
              <FormFieldWrapper
                control={form.control}
                name={"amount"}
                label={"New amount"}
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
