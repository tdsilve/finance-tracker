"use client";
import React from "react";
import { SheetContainer } from "./sheet-container";
import { Button } from "~/components/ui/button";

type SheetProviderProps = {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  triggerLabel: string | React.ReactNode;
};

export const SheetProvider = ({
  children,
  open,
  setOpen,
  title,
  description,
  triggerLabel,
}: SheetProviderProps) => {
  return (
    <SheetContainer
      open={open}
      setOpen={setOpen}
      sheetTitle={title}
      sheetDescription={description}
      sheetTrigger={
        <Button className="border-none text-white ">{triggerLabel}</Button>
      }
    >
      {children}
    </SheetContainer>
  );
};
