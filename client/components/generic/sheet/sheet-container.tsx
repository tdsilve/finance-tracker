"use client";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";

import { RiMenuLine } from "react-icons/ri";
import { Heading } from "../heading";
import { useNewAccountSheet } from "~/hooks/accounts/useNewAccountSheet";

type SheetContainerProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  sheetTitle?: React.ReactNode;
  sheetDescription?: React.ReactNode;
  sheetTrigger: React.ReactNode;
};

export const SheetContainer = ({
  open,
  setOpen,
  children,
  sheetTitle,
  sheetDescription,
  sheetTrigger
}: SheetContainerProps) => {
  useNewAccountSheet();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="border">
        {sheetTrigger}
      </SheetTrigger>
      <SheetContent className="bg-white p-0">
        <div className="space-y-4 py-4 text-center">
          {!!sheetTitle && (
            <SheetTitle>
              <Heading tag={"h3"}>{sheetTitle}</Heading>
            </SheetTitle>
          )}
          {!!sheetDescription && (
            <SheetDescription className="text-base font-light">
              {sheetDescription}
            </SheetDescription>
          )}
        </div>

        {children}
      </SheetContent>
    </Sheet>
  );
};
