import React from "react";
import { Finance } from "~/model/types";

export const ColumnCategory = ({
  category,
}: {
  category: Finance["category"];
}) => {
  const icon = category === "Income" ? "💰" : "💸";
  return (
    <div>
      <span className="mr-2 text-xl">{icon}</span>
      {category}
    </div>
  );
};
