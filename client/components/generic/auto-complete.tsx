import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type AutoCompleteProps<T extends { id: number | string; name: string }> = {
  values?: T[];
  triggerChildren: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
};

export const AutoComplete = <T extends { id: number | string; name: string }>({
  values,
  triggerChildren,
  selected = "",
  setSelected,
}: AutoCompleteProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const filteredValues = values?.filter(({ name }) => name.includes(selected));
  const setClose = () => setOpen(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="flex w-full flex-col">
        {triggerChildren}
      </PopoverTrigger>
      <PopoverContent align={"start"} className="w-[26rem]">
        <ul className="flex w-full flex-col gap-1">
          {filteredValues?.map(({ id, name }) => (
            <li
              key={`${id}_${name}`}
              className="w-full cursor-pointer rounded-md  p-2 text-black/60 hover:bg-gray-50"
              onClick={() => {
                setSelected(name);
                setClose();
              }}
            >
              {name}
            </li>
          ))}
          {filteredValues?.length === 0 && (
            <li className="w-full text-gray-500">No accounts found</li>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
