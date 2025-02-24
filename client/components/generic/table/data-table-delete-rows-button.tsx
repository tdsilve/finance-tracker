import React from "react";
import { Button } from "~/components/ui/button";

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
    <Button variant={"destructive"} onClick={onClick} disabled={disabled}>
      {content}
    </Button>
  );
};
