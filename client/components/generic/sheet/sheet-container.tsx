"use client";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "~/components/ui/sheet";

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
  sheetTrigger,
}: SheetContainerProps) => {
  useNewAccountSheet();
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="border">
        {sheetTrigger}
      </SheetTrigger>
      <SheetContent className="bg-white p-0">
        <div className="space-y-4 py-4 text-center">
          {!!sheetTitle && <SheetTitle>{sheetTitle}</SheetTitle>}
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
