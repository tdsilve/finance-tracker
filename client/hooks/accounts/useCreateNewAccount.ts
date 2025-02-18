"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { NewAccountSchema } from "~/model/schemas";
import { NewAccount } from "~/model/types";
import { useNewAccountMutation } from "~/api/mutation/useNewAccountMutation";
import { useAccountsInfiniteQuery } from "~/api/query/useAccountsInfiniteQuery";
import { useDebounce } from "../useDebounce";

export const useCreateNewAccount = () => {
  const { mutate } = useNewAccountMutation({ onSuccess: () => form.reset() });
  const form = useForm({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: { name: "" },
  });
  const name = form.watch("name");
  const debouncedName = useDebounce({ value: name, delay: 500 }) as string;
  const { data, refetch } = useAccountsInfiniteQuery({
    fieldsSearch: debouncedName,
  });
  React.useEffect(() => {
    refetch();
  }, [debouncedName, refetch]);

  const onSubmit = (data: NewAccount) => {
    mutate(data.name);
  };

  const isPending = false;

  return {
    form,
    onSubmit,
    isPending,
    accounts: data?.pages?.flatMap((page) => page.content),
  };
};
