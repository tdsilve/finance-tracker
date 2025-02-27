import React from "react";
import { AccountsDataTable } from "~/components/accounts/table/accounts-data-table";
import { MainLayout } from "~/components/generic/layout/main-layout";
import { AccountSheetProvider } from "~/provider/account-sheet-provider";

export default function AccountsPage() {
  return (
    <MainLayout title="Accounts Page" headerContent={<AccountSheetProvider />}>
  <AccountsDataTable />
    </MainLayout>
 
  );
}
