import React from "react";
import { Form } from "../ui/form";
import { FormFieldWrapper } from "../generic/form/FormFields";
import { useCreateNewAccount } from "~/hooks/accounts/useCreateNewAccount";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Flex } from "../generic/flex";
import { RiDeleteBinLine } from "react-icons/ri";

import { AutoComplete } from "../generic/auto-complete";

export const NewAccountForm = () => {
  const { form, onSubmit, isPending, accounts } = useCreateNewAccount();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Flex className="mx-auto w-full max-w-md p-4" gap={4} col>
          <AutoComplete
            values={accounts}
            selected={form.getValues("name")}
            setSelected={(value) => form.setValue("name", value)}
            triggerChildren={
              <FormFieldWrapper
                control={form.control}
                name={"name"}
                label={"Name"}
                renderInput={(field) => (
                  <Input
                    {...field}
                    type={"text"}
                    placeholder={"e.g. Cash, Credit Card"}
                    className="w-full text-left"
                  />
                )}
              />
            }
          />

          <Button type="submit" disabled={isPending} loading={isPending}>
            Create Account
          </Button>
          <Button
            type="button"
            variant={"outline"}
            disabled={isPending || form.getValues("name") === ""}
            loading={isPending}
          >
            <RiDeleteBinLine /> Delete Account
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
