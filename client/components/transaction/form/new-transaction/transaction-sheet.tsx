"use client";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { useNewTransactionSheet } from "~/hooks/transaction/useNewTrasanctionSheet";
import { SheetProvider } from "~/components/generic/sheet/sheet-provider";
import { Flex } from "~/components/generic/flex";
import { NewTransactionForm } from "./new-transaction-form";

export const TransactionSheet = () => {
  const { open, toggle } = useNewTransactionSheet();
  return (
    <SheetProvider
      open={open}
      setOpen={toggle}
      title={"New Transaction"}
      description={"Create a new income or expense"}
      triggerLabel={
        <Flex items="center" gap={2}>
          <RiAddLine /> Add Transaction
        </Flex>
      }
    >
      <NewTransactionForm />
    </SheetProvider>
  );
};
