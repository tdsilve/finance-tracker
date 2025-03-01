"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { NewAccountSchema } from "~/model/schemas";
import { NewAccount } from "~/model/types";
import { useNewAccountMutation } from "~/api/mutation/useNewAccountMutation";
import { useAccountsInfiniteQuery } from "~/api/query/useAccountsInfiniteQuery";
import { useDebounce } from "../useDebounce";
import { useDeleteAccountMutation } from "~/api/mutation/useDeleteAccountMutation";
import { Account } from "~/model/types";

export const useAccountForm = () => {
  const [selectedId, setSelectedId] = React.useState<Account["_id"] | null>(
    null,
  );
  const form = useForm({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: { name: "", amount: 0 },
  });
  const resetForm = () => {
    form.reset();
    setSelectedId(null);
  };
  const { mutate, isPending } = useNewAccountMutation({
    onSuccess: () => resetForm(),
    onError: () => resetForm(),
  });
  const deleteAccount = useDeleteAccountMutation({
    onSuccess: () => {
      resetForm();
    },
    onError: () => resetForm(),
  });

  const name = form.watch("name");
  const debouncedName = useDebounce({ value: name, delay: 500 }) as string;
  const { data, refetch } = useAccountsInfiniteQuery({
    fieldsSearch: debouncedName,
  });
  React.useEffect(() => {
    if (debouncedName.length === 0) return;
    refetch();
  }, [debouncedName, refetch]);

  const onSubmit = (data: NewAccount) => {
    mutate({ name: data.name, amount: data.amount });
  };

  const handleDeleteAccount = () => {
    if (!selectedId) return;
    deleteAccount.mutate([selectedId]);
  };
  const desableDeleteBtn = !selectedId || deleteAccount.isPending;
  return {
    form,
    onSubmit,
    isPending,
    accounts: data?.pages?.flatMap((page) => page.content),
    handleDeleteAccount,
    setSelectedId,
    deleteAccount,
    desableDeleteBtn,
  };
};
