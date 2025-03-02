"use client";
import { NewFinanceSchema } from "~/model/schemas";
import { NewFinance } from "~/model/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useNewFinance = () => {
  const form = useForm({
    resolver: zodResolver(NewFinanceSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "Income",
      date: new Date().getTime(),
    },
  });

  function onSubmit(data: NewFinance) {
    console.log(data);
  }
  return {
    form,
    onSubmit,
  };
};
