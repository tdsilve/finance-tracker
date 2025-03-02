"use client";
import { Form } from "~/components/ui/form";
import { useNewFinance } from "~/hooks/finance/useNewFinanceForm";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export const NewFinanceForm = () => {
  const { form, onSubmit } = useNewFinance();
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
            <Input {...field} placeholder={"Enter a value"} />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="date"
          label="Date"
          renderInput={(field) => (
            <Input {...field} placeholder={"Enter a value"} />
          )}
        />
        <FormFieldWrapper
          control={form.control}
          name="category"
          label="Category"
          renderInput={(field) => (
            <Input {...field} placeholder={"Select a category"} />
          )}
        />

        <Button type="submit">Create Finance</Button>
      </form>
    </Form>
  );
};
