import React from "react";
import { Finance } from "~/model/types";
import { DataTableColumnAction } from "~/components/generic/layout/data-table-column-action";
import { EditFinanceDialog } from "./actions/edit-finance-dialog";
import { DeleteFinanceDialog } from "./actions/delete-finance-dialog";

export const ColumnActions = ({ finance }: { finance: Finance }) => {
  return (
    <DataTableColumnAction
      items={({ handleClose }) => [
        <EditFinanceDialog
          key="edit"
          handleActionsClose={handleClose}
          id={finance._id}
        />,
        <DeleteFinanceDialog
          key="delete"
          handleActionsClose={handleClose}
          finance={finance}
        />,
      ]}
    />
  );
};
