import React from "react";
import { PaymentsTable } from "~/components/accounts/payments/PaymentsTable";
import { CardHeader, CardTitle } from "~/components/ui/card";
import { SheetProvider } from "~/provider/sheet-provider";

export default function AccountsPage() {
  return (
    <div>
      <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between max-w-screen-2xl mx-auto w-full -mt-24">
        <CardTitle>Accounts Page</CardTitle> <SheetProvider />
      </CardHeader>
      <PaymentsTable/>
    </div>
  );
}
