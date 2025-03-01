import React from "react";
import { formatDate } from "date-fns";

export const ColumnDate = ({ date }: { date: Date }) => {
  return <>{formatDate(new Date(date), "dd/MM/yyyy")}</>;
};
