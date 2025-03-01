import React from "react";
import { AccountSheet } from "~/components/accounts/new-account/account-sheet";
import { AccountsDataTable } from "~/components/accounts/table/accounts-data-table";
import { MainLayout } from "~/components/generic/layout/main-layout";

export default function AccountsPage() {
  return (
    <MainLayout title="Accounts Page" headerContent={<AccountSheet />}>
      <AccountsDataTable />
    </MainLayout>
  );
}
