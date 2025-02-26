"use client";

import React from "react";
import { useAccountsInfiniteQuery } from "~/api/query/useAccountsInfiniteQuery";
import { Loading } from "~/components/generic/loading/loading";
import { ErrorAlert } from "~/components/generic/alert/error-alert";
import { NoDataAlert } from "~/components/generic/alert/no-data-alert";
import { HTTPErrorCode } from "~/lib/error";
import { AccountsTable } from "./accounts-table";
import { PaginationState } from "@tanstack/react-table";

export type  Aux= {
  limit: number;
  pageParam: number;
}

export const AccountsDataTable = () => {
 const [aux, setAux] = React.useState<Aux>({ limit: 5, pageParam: 1 });
  const { data, isLoading, isError, refetch, error, fetchNextPage } = useAccountsInfiniteQuery(
    { limit: aux.limit, pageParam: aux.pageParam },
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
  const lastPageIndex = data.pages.length -1 ;

  return <AccountsTable data={flatData} totalPages={data?.pages[0].totalPages} currentPage={data.pages[lastPageIndex].currentPage}  aux={aux} setAux={setAux}  />;
};
