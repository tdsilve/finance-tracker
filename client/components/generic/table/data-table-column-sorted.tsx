import React from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/css";
import { RiArrowUpLine } from "react-icons/ri";

type DataTableColumnSortedProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isDesc?: boolean;
};

export const DataTableColumnSorted = ({
  children,
  onClick,
  isDesc,
}: DataTableColumnSortedProps) => {
  if (!onClick) return <div>{children}</div>;
  return (
    <Button onClick={onClick} variant={"ghost"}>
      {children}{" "}
      <span className={cn(isDesc && "rotate-180 animate")}>
        <RiArrowUpLine />
      </span>{" "}
    </Button>
  );
};
