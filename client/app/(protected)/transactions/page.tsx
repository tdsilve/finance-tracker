import React from "react";
import { TransactionSheet } from "~/components/transaction/form/new-transaction/transaction-sheet";
import { TransactionDataTable } from "~/components/transaction/table/transaction-data-table";
import { TotalBalance } from "~/components/transaction/total/total-balance";
import { MainLayout } from "~/components/generic/layout/main-layout";

export default function CategoriesPage() {
  return (
    <MainLayout title="Transactions" headerContent={<TransactionSheet />}>
      <TotalBalance />
      <TransactionDataTable />
    </MainLayout>
  );
}
