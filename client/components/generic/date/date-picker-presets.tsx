"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { RiCalendarLine } from "react-icons/ri";

import { cn } from "~/lib/css";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type DatePresetsList = {
  label: string;
  value: number;
}[];

type DatePickerWithPresetsProps = {
  date: Date | undefined;
  setDate: (val: Date | undefined) => void;
  presets?: DatePresetsList;
};

const defaultPresets: DatePresetsList = [
  { label: "Today", value: 0 },
  { label: "Tomorrow", value: 1 },
  { label: "In 3 days", value: 3 },
  { label: "In a week", value: 7 },
];

export const DatePickerWithPresets = ({
  date,
  setDate,
  presets = defaultPresets,
}: DatePickerWithPresetsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <RiCalendarLine />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            {presets?.map(({ value, label }) => (
              <SelectItem value={value.toString()} key={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
