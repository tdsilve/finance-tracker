"use client";
import React from "react";

type Values = { _id: string; name: string };

type AutoCompleteProps = {
  values?: Values[];

  selected: string;
  setSelected: (value: string) => void;
  placeholder?: string;
  setSelectedId?: (id: Values["_id"]) => void;
  onMouseLeave?: () => void;
};
export const AccountsList = ({
  values,
  onMouseLeave,
  setSelected,
  setSelectedId,
}: AutoCompleteProps) => {
  return (
    <div className="w-full min-w-[300px]" onMouseLeave={onMouseLeave}>
      {values?.map(({ _id, name }) => (
        <div
          className="w-full cursor-pointer rounded-md p-2 text-gray-600 hover:bg-gray-100"
          key={_id}
          onClick={() => {
            setSelected(name);

            setSelectedId?.(_id);
          }}
        >
          {name}
        </div>
      ))}
      {!values?.length && (
        <div className="w-full p-2 text-center text-gray-600">
          No results found.
        </div>
      )}
    </div>
  );
};
