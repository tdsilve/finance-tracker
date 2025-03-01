"use client";
import React from "react";
import { useNewAccountSheet } from "~/hooks/accounts/useNewAccountSheet";

import { NewAccountForm } from "./new-account-form";
import { RiAddLine } from "react-icons/ri";
import { SheetProvider } from "~/components/generic/sheet/sheet-provider";
import { Flex } from "~/components/generic/flex";

export const AccountSheet = () => {
  const { open, toggle } = useNewAccountSheet();
  return (
    <SheetProvider
      open={open}
      setOpen={toggle}
      title={"New Account"}
      description={"Create a new account to track your transactions"}
      triggerLabel={
        <Flex gap={2} items="center">
          <RiAddLine /> Add account
        </Flex>
      }
    >
      <NewAccountForm />
    </SheetProvider>
  );
};
