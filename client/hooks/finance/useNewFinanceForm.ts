"use client";
import { NewFinanceSchema } from "~/model/schemas";
import { NewFinance } from "~/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useNewFinanceMutation } from "~/api/mutation/useNewFinanceMutation";

export const useNewFinance = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(NewFinanceSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "Income",
      date: format(new Date(), "yyyy/MM/dd"),
      notes: "",
    },
  });
  const { mutate, isPending } = useNewFinanceMutation({
    onSuccess: () => form.reset(),
  });

  function onSubmit(data: NewFinance) {
    mutate(data);
  }
  return {
    form,
    onSubmit,
    isPending,
  };
};
