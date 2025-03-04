import React from "react";

import { Account } from "~/model/types";

import { EditAccountDialog } from "./edit-accounts-dialog";
import { DeleteAccountDialog } from "./delete-accounts-dialog";
import { DataTableColumnAction } from "~/components/generic/layout/data-table-column-action";

export type AccountsActionsProps = {
  id: Account["_id"];
  name: Account["name"];
};

export const ColumnActions = ({ id, name }: AccountsActionsProps) => {
  return (
    <DataTableColumnAction
      items={({ handleClose }) => [
        <EditAccountDialog key={1} id={id} handleActionsClose={handleClose} />,
        <DeleteAccountDialog
          key={2}
          id={id}
          name={name}
          handleActionsClose={handleClose}
        />,
      ]}
    />
  );
};
