import React from "react";
import { FinanceSheet } from "~/components/finance/form/new-finance/finance-sheet";
import { FinanceDataTable } from "~/components/finance/table/finance-data-table";
import { TotalBalance } from "~/components/finance/total/total-balance";
import { MainLayout } from "~/components/generic/layout/main-layout";

export default function CategoriesPage() {
  return (
    <MainLayout title="Income & Expenses" headerContent={<FinanceSheet />}>
      <TotalBalance />
      <FinanceDataTable />
    </MainLayout>
  );
}
