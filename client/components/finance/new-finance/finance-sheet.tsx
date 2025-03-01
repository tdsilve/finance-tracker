"use client";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { useNewFinanceSheet } from "~/hooks/finance/useNewFinanceSheet";
import { SheetProvider } from "~/components/generic/sheet/sheet-provider";
import { Flex } from "~/components/generic/flex";
import { NewFinanceForm } from "./new-finance-form";

export const FinanceSheet = () => {
  const { open, toggle } = useNewFinanceSheet();
  return (
    <SheetProvider
      open={open}
      setOpen={toggle}
      title={"New Finance"}
      description={"Create a new income or expense"}
      triggerLabel={
        <Flex items="center" gap={2}>
          <RiAddLine /> Add Finance
        </Flex>
      }
    >
      <NewFinanceForm />
    </SheetProvider>
  );
};
