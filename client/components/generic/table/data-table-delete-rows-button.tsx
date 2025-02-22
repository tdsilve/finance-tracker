import React from "react";
import { Button } from "~/components/ui/button";

type DataTableDeleteRowsButtonProps = {
  label?: string;
  onClick: () => void;
};

export const DataTableDeleteRowsButton = ({
  label,
  onClick,
}: DataTableDeleteRowsButtonProps) => {
  const content = label ?? "Delete";
  return (
    <Button variant={"destructive"} onClick={onClick}>
      {content}
    </Button>
  );
};
