import React from "react";
import { Transaction } from "~/model/types";

export const ColumnCategory = ({
  category,
}: {
  category: Transaction["category"];
}) => {
  const icon = category === "Income" ? "💰" : "💸";
  return (
    <div>
      <span className="mr-2 text-xl">{icon}</span>
      {category}
    </div>
  );
};
