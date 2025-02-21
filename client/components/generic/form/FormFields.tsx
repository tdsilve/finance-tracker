import React from "react";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/css";

type FormFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  renderInput: (field: ControllerRenderProps<T>) => React.ReactNode;
  className?: string;
};

export const FormFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  renderInput,
  className,
}: FormFieldsProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
