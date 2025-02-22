"use client";

import React from "react";
import { useAccountsInfiniteQuery } from "~/api/query/useAccountsInfiniteQuery";
import { Loading } from "~/components/generic/loading/loading";
import { ErrorAlert } from "~/components/generic/alert/error-alert";
import { NoDataAlert } from "~/components/generic/alert/no-data-alert";
import { HTTPErrorCode } from "~/lib/error";
import { AccountsTable } from "./accounts-table";

export const AccountsDataTable = () => {
  const { data, isLoading, isError, refetch, error } = useAccountsInfiniteQuery(
    { limit: 10 },
  );
  if (isLoading) return <Loading />;
  if (isError) {
    if (error?.status === HTTPErrorCode.NOT_FOUND) {
      return <NoDataAlert message="No accounts found" action={refetch} />;
    }
    return <ErrorAlert message="Something went wrong" action={refetch} />;
  }
  if (!data)
    return <NoDataAlert message="No accounts found" action={refetch} />;
  const flatData = data?.pages?.flatMap((page) => page.content);
  return <AccountsTable data={flatData} />;
};
