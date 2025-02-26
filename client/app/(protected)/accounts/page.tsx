import React from "react";
import { AccountsDataTable } from "~/components/accounts/table/accounts-data-table";
import { CardHeader, CardTitle } from "~/components/ui/card";
import { AccountSheetProvider } from "~/provider/account-sheet-provider";

export default function AccountsPage() {
  return (
    <div className="h-full">
      <CardHeader className="mx-auto -mt-24 w-full max-w-screen-2xl gap-y-2 md:flex-row md:items-center md:justify-between h-full">
        <CardTitle>Accounts Page</CardTitle> <AccountSheetProvider />
      </CardHeader>
      <AccountsDataTable />
    </div>
  );
}
