"use client";
import { NewTransactionSchema } from "~/model/schemas";
import { NewTransaction } from "~/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useNewTransactionMutation } from "~/api/mutation/useNewTransactionMutation";

export const useNewTransactionForm = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(NewTransactionSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "Income",
      date: format(new Date(), "yyyy/MM/dd"),
      notes: "",
    },
  });
  const { mutate, isPending } = useNewTransactionMutation({
    onSuccess: () => form.reset(),
  });

  function onSubmit(data: NewTransaction) {
    mutate(data);
  }
  return {
    form,
    onSubmit,
    isPending,
  };
};
