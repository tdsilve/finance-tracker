import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import React from "react";
import { Transaction } from "~/model/types";

type SelectCategoriesProps = {
  category: Transaction["category"];
  setCategory: (val: Transaction["category"]) => void;
};

const defaultCategories: Transaction["category"][] = ["Income", "Expense"];

export const SelectCategories = ({
  category,
  setCategory,
}: SelectCategoriesProps) => {
  return (
    <Select onValueChange={setCategory}>
      <SelectTrigger>
        <SelectValue placeholder={category} />
      </SelectTrigger>
      <SelectContent>
        {defaultCategories?.map((category) => (
          <SelectItem value={category} key={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
