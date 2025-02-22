"use client";
import React from "react";
import { usePaymentsInfiniteQuery } from "~/api/query/usePaymentsInfiniteQuery";
import { ErrorAlert } from "~/components/generic/alert/error-alert";
import { Loading } from "~/components/generic/loading/loading";
import { PaymentColumns } from "./PaymentColumns";
import { DataTable } from "./Table";

export const PaymentsTable = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data, isLoading, isError, refetch } = usePaymentsInfiniteQuery({
    limit: rowsPerPage,
  });
  if (isLoading) return <Loading />;
  if (isError || !data)
    return <ErrorAlert message="Something went wrong" action={refetch} />;
  const flatData = data?.pages.flatMap((page) => page.content);
  return (
    <DataTable
      columns={PaymentColumns}
      data={flatData}
      rowsPerPage={rowsPerPage}
      setRowsPerPage={setRowsPerPage}
    />
  );
};
