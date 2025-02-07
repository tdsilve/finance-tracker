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

type FormFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  renderInput: (field: ControllerRenderProps<T>) => React.ReactNode;
};

export const FormFieldWrapper = <T extends FieldValues>({
  control,
  name,
  label,
  renderInput,
}: FormFieldsProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
