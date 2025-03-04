"use client";
import { Form } from "~/components/ui/form";
import { useNewFinance } from "~/hooks/finance/useNewFinanceForm";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

import { FinanceDatePicker } from "../FinanceDatePicker";
import { Textarea } from "~/components/ui/textarea";
import { SelectCategories } from "../SelectCategories";
import { Finance } from "~/model/types";

export const NewFinanceForm = () => {
  const { form, onSubmit, isPending } = useNewFinance();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dialog-form-container"
      >
        <FormFieldWrapper
          control={form.control}
          name="name"
          label="Name"
          renderInput={(field) => (
            <Input {...field} placeholder={"Enter name"} />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="amount"
          label="Amount"
          renderInput={(field) => (
            <Input {...field} placeholder={"Enter a value"} type="number" />
          )}
        />

        <FormFieldWrapper
          control={form.control}
          name="date"
          label="Date"
          className="flex flex-col"
          renderInput={(field) => (
            <FinanceDatePicker
              date={new Date(field.value)}
              setDate={(val) => {
                const date = !!val ? val.toISOString() : new Date().getTime();
                field.onChange(date);
              }}
            />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="category"
          label="Category"
          renderInput={(field) => (
            <SelectCategories
              category={field.value as Finance["category"]}
              setCategory={field.onChange}
            />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="notes"
          label="Notes"
          renderInput={(field) => (
            <Textarea
              {...field}
              placeholder={"Select a category"}
              className="resize-none"
            />
          )}
        />

        <Button type="submit" loading={isPending} disabled={isPending}>
          Create Finance
        </Button>
      </form>
    </Form>
  );
};
