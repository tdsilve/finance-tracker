import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "../ui/input";

type AutoCompleteProps<T extends { _id: string; name: string }> = {
  values?: T[];

  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  setSelectedId?: (id: T["_id"]) => void;
};

export const AutoComplete = <T extends { _id: string; name: string }>({
  values,
  placeholder,
  selected = "",
  setSelected,
  setSelectedId,
}: AutoCompleteProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const filteredValues = values?.filter(({ name }) => name.includes(selected));

  const setClose = () => setOpen(false);

  const handleInputClick = () => {
    setOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleMouseLeave = () => {
    setClose();
  };

  return (
    <div className="border">
      <Popover open={open}>
        <PopoverTrigger className="flex w-full flex-col">
          <Input
            type={"text"}
            placeholder={placeholder}
            className="w-full text-left "
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          className="w-[26rem]"
          onMouseLeave={handleMouseLeave}
          role="listbox"
        >
          <ul className="flex w-full flex-col gap-1  overflow-y-auto">
            {filteredValues?.map(({ _id, name }) => (
              <li
                key={`${_id}_${name}`}
                className="w-full cursor-pointer rounded-md  p-2 text-black/60 hover:bg-gray-50"
                onClick={() => {
                  setSelected(name);
                  console.log("setSelectedId: ", filteredValues[0]._id);
                  setSelectedId?.(_id);
                  setClose();
                }}
              >
                {name}
              </li>
            ))}
            {filteredValues?.length === 0 && (
              <li className="w-full text-gray-500">No results</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};
