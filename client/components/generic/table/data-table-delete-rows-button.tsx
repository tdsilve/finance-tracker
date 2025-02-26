import React from "react";
import { Button } from "~/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";

type DataTableDeleteRowsButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
};

export const DataTableDeleteRowsButton = ({
  label,
  onClick,
  disabled,
}: DataTableDeleteRowsButtonProps) => {
  const content = label ?? "Delete";
  return (
    <Button variant={"outline"} onClick={onClick} disabled={disabled}>
      <RiDeleteBinLine /> {content}
    </Button>
  );
};
