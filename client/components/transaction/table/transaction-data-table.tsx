"use client";
import React from "react";
import { useTransactionInfiniteQuery } from "~/api/query/useTransactionInfiniteQuery";
import { Loading } from "~/components/generic/loading/loading";
import { ErrorAlert } from "~/components/generic/alert/error-alert";
import { NoDataAlert } from "~/components/generic/alert/no-data-alert";
import { HTTPErrorCode } from "~/lib/error";
import { TransactionTable } from "./transaction-table";

import { Params } from "~/model/types";

export const TransactionDataTable = () => {
  const [params, setParams] = React.useState<Params>({
    limit: 5,
    pageParam: 1,
  });
  const { data, isLoading, isError, refetch, error, isFetching } =
    useTransactionInfiniteQuery({
      limit: params.limit,
      pageParam: params.pageParam,
    });

  if (isLoading)
    return (
      <div className="grid size-full min-h-[300px] place-items-center">
        <Loading size={50} />
      </div>
    );
  if (isError) {
    if (error?.status === HTTPErrorCode.NOT_FOUND) {
      return (
        <NoDataAlert
          message="No transactions found"
          action={refetch}
          isLoading={isFetching}
        />
      );
    }
    return (
      <ErrorAlert
        message="Something went wrong"
        action={refetch}
        isLoading={isFetching}
      />
    );
  }
  if (!data)
    return <NoDataAlert message="No transactions found" action={refetch} />;
  const flatData = data?.pages?.flatMap((page) => page.content);
  return (
    <TransactionTable
      data={flatData}
      totalPages={data?.pages[0].totalPages}
      params={params}
      setParams={setParams}
    />
  );
};
