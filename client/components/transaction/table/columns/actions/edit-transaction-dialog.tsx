"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { useEditTransactionMutation } from "~/api/mutation/useEditTransactionMutation";
import { useForm } from "react-hook-form";
import { EditTransaction, Transaction } from "~/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";
import { Flex } from "~/components/generic/flex";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { Input } from "~/components/ui/input";
import { DatePickerWithPresets } from "~/components/generic/date/date-picker-presets";
import { Textarea } from "~/components/ui/textarea";
import { SelectCategories } from "~/components/transaction/form/category-select";
import { format } from "date-fns";
import { EditTransactionSchema } from "~/model/schemas";

type EditTransactionDialogProps = {
  handleActionsClose: () => void;
  id: Transaction["_id"];
};

export const EditTransactionDialog = React.forwardRef<
  HTMLDivElement,
  EditTransactionDialogProps
>(({ handleActionsClose, id }: EditTransactionDialogProps, ref) => {
  const [open, setOpen] = React.useState(false);

  const updateFinance = useEditTransactionMutation({
    onSuccess: () => handleActionsClose(),
  });

  const handleClose = () => {
    setOpen(false);
    handleActionsClose();
  };

  const onSubmit = (data: EditTransaction) => {
    updateFinance.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(EditTransactionSchema),
    defaultValues: {
      name: "",
      _id: id,
      amount: "",
      category: "Income",
      date: format(new Date(), "yyyy/MM/dd"),
      notes: "",
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Edit finance </DialogTitle>
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
                  <Input
                    {...field}
                    placeholder={"Enter a value"}
                    type="number"
                  />
                )}
              />
              <FormFieldWrapper
                control={form.control}
                name={"date"}
                label={"New date"}
                className="flex flex-col"
                renderInput={(field) => (
                  <DatePickerWithPresets
                    date={new Date(field.value)}
                    setDate={(val) => {
                      const date = !!val
                        ? val.toISOString()
                        : new Date().getTime();
                      field.onChange(date);
                    }}
                  />
                )}
              />
              <FormFieldWrapper
                control={form.control}
                name={"category"}
                label={"New category"}
                className="flex flex-col"
                renderInput={(field) => (
                  <SelectCategories
                    category={field.value as EditTransaction["category"]}
                    setCategory={field.onChange}
                  />
                )}
              />
              <FormFieldWrapper
                control={form.control}
                name={"notes"}
                label={"New notes"}
                className="flex flex-col"
                renderInput={(field) => (
                  <Textarea
                    {...field}
                    placeholder={"Select a category"}
                    className="resize-none"
                  />
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
