"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { NewAccountSchema } from "~/model/schemas";
import { NewAccount } from "~/model/types";
import { useNewAccountMutation } from "~/api/mutation/useNewAccountMutation";

export const useNewAccountForm = () => {
  const form = useForm({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: { name: "", amount: "" },
  });
  const resetForm = () => {
    form.reset();
  };
  const { mutate, isPending } = useNewAccountMutation({
    onSuccess: () => resetForm(),
    onError: () => resetForm(),
  });

  function onSubmit(data: NewAccount) {
    mutate({ name: data.name, amount: data.amount });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
};
