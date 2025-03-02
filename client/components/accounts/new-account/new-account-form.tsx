import React from "react";
import { Form } from "../../ui/form";

import { useNewAccountForm } from "~/hooks/accounts/useNewAccountForm";
import { Button } from "../../ui/button";
import { Flex } from "../../generic/flex";

import { FormFieldWrapper } from "../../generic/form/FormFields";

import { Input } from "~/components/ui/input";

export const NewAccountForm = () => {
  const { form, onSubmit, isPending } = useNewAccountForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="dialog-form-container"
      >
        <Flex col gap={2}>
          <FormFieldWrapper
            control={form.control}
            name={"name"}
            label={"Name"}
            className="flex flex-col"
            renderInput={(field) => (
              <Input {...field} className="w-full" placeholder={"Enter name"} />
            )}
          />

          <FormFieldWrapper
            control={form.control}
            name={"amount"}
            label={"Amount"}
            className="flex flex-col"
            renderInput={(field) => (
              <Input {...field} type="number" placeholder="e.g. 100" />
            )}
          />
        </Flex>
        <Flex col gap={2}>
          <Button type="submit" disabled={isPending} loading={isPending}>
            Create Account
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
