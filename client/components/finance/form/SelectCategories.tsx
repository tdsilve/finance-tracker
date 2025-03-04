import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import React from "react";
import { Finance } from "~/model/types";

type SelectCategoriesProps = {
  category: Finance["category"];
  setCategory: (val: Finance["category"]) => void;
};

const defaultCategories: Finance["category"][] = ["Income", "Expense"];

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
