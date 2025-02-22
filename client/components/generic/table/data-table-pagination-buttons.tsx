import React from "react";
import { Button } from "~/components/ui/button";
import { Flex } from "../flex";

type DataTablePaginationProps = {
  onNextPage: () => void;
  onPreviousPage: () => void;
  disablePreviousPage: boolean;
  disableNextPage: boolean;
};

export const TablePaginationButtons = ({
  onNextPage,
  onPreviousPage,
  disablePreviousPage,
  disableNextPage,
}: DataTablePaginationProps) => {
  return (
    <Flex items="center" gap={2}>
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={disablePreviousPage}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={disableNextPage}
      >
        Next
      </Button>
    </Flex>
  );
};
