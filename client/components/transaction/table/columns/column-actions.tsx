import React from "react";
import { Transaction } from "~/model/types";
import { DataTableColumnAction } from "~/components/generic/layout/data-table-column-action";
import { EditTransactionDialog } from "./actions/edit-transaction-dialog";
import { DeleteTransactionDialog } from "./actions/delete-transaction-dialog";

export const ColumnActions = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <DataTableColumnAction
      items={({ handleClose }) => [
        <EditTransactionDialog
          key="edit"
          handleActionsClose={handleClose}
          id={transaction._id}
        />,
        <DeleteTransactionDialog
          key="delete"
          handleActionsClose={handleClose}
          transaction={transaction}
        />,
      ]}
    />
  );
};
