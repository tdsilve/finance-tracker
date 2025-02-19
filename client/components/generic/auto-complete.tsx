import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Input } from "../ui/input";
import { sanitizeStringToCompare } from "~/utils/string";

type Values = 
  { _id: string; name: string }


type AutoCompleteProps = {
  values?: Values[];

  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  setSelectedId?: (id: Values["_id"]) => void;
};

export const AutoComplete = ({
  values,
  placeholder,
  selected = "",
  setSelected,
  setSelectedId,
}: AutoCompleteProps) => {
  const [open, setOpen] = React.useState(false);
  const filteredValues = values?.filter(({ name }) => sanitizeStringToCompare(name).includes(sanitizeStringToCompare(selected)));

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
            onChange={(e) => {
              setSelected(e.target.value)
              
            }}
            onClick={handleInputClick}
            onKeyDown={handleKeyDown}
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
                key={_id}
                className="w-full cursor-pointer rounded-md  p-2 text-black/60 hover:bg-gray-50"
                onClick={() => {
                  setSelected(name);

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
