"use client";
import React from "react";
import { useNewAccountSheet } from "~/hooks/accounts/useNewAccountSheet";

import { SheetContainer } from "../../generic/sheet/sheet-container";
import { NewAccountForm } from "./new-account-form";
import { Button } from "../../ui/button";
import { RiAddLine } from "react-icons/ri";

export const AccountSheet = () => {
  const { open, toggle } = useNewAccountSheet();
  return (
    <SheetContainer
      open={open}
      setOpen={toggle}
      sheetTitle={"New Account"}
      sheetDescription={"Create a new account to track your transactions"}
      sheetTrigger={
        <Button className="border-none text-white "><RiAddLine/> Add account</Button>
      }
    >
      <NewAccountForm />
    </SheetContainer>
  );
};
