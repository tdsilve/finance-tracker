import React from "react";
import { FinanceSheet } from "~/components/finance/new-finance/finance-sheet";
import { FinanceDataTable } from "~/components/finance/table/finance-data-table";
import { MainLayout } from "~/components/generic/layout/main-layout";

export default function CategoriesPage() {
  return (
    <MainLayout title="Income & Expenses" headerContent={<FinanceSheet />}>
      <FinanceDataTable />
    </MainLayout>
  );
}
