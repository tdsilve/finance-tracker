import React from "react";
import { Input } from "~/components/ui/input";

type DataTableSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
export const DataTableSearchInput = ({
  value,
  onChange,
  placeholder,
}: DataTableSearchInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="max-w-sm"
    />
  );
};
