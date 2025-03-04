import React from "react";
import { DatePickerWithPresets } from "~/components/generic/date/date-picker-presets";
import { DatePresetsList } from "~/components/generic/date/date-picker-presets";

type FinanceDatePickerProps = {
  date: Date | undefined;
  setDate: (val: Date | undefined) => void;
};

export const TransactionDatePicker = ({
  date,
  setDate,
}: FinanceDatePickerProps) => {
  const presets: DatePresetsList = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 1 },
    { label: "In a week", value: 7 },
  ];
  return (
    <DatePickerWithPresets date={date} setDate={setDate} presets={presets} />
  );
};
