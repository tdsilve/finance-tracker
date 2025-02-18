import React from "react";
import { Form } from "../..//ui/form";

import { useCreateNewAccount } from "~/hooks/accounts/useCreateNewAccount";
import { Button } from "../../ui/button";
import { Flex } from "../../generic/flex";
import { RiDeleteBinLine } from "react-icons/ri";

import { AutoComplete } from "../../generic/auto-complete";

import { FormFieldWrapper } from "../../generic/form/FormFields";

export const NewAccountForm = () => {
  const {
    form,
    onSubmit,
    isPending,
    accounts,
    handleDeleteAccount,
    setSelectedId,
    deleteAccount,
  } = useCreateNewAccount();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Flex className="mx-auto w-full max-w-md p-4" gap={4} col>
          <FormFieldWrapper
            control={form.control}
            name={"name"}
            label={"Name"}
            renderInput={(field) => (
              <AutoComplete
                values={accounts}
                placeholder="e.g. Cash, Credit Card"
                selected={field.value}
                setSelected={field.onChange}
                setSelectedId={(id) => setSelectedId(id as string)}
              />
            )}
          />

          <Button type="submit" disabled={isPending} loading={isPending}>
            Create Account
          </Button>
          <Button
            type="button"
            variant={"outline"}
            disabled={deleteAccount.isPending || form.getValues("name") === ""}
            loading={deleteAccount.isPending}
            onClick={handleDeleteAccount}
          >
            <RiDeleteBinLine /> Delete Account
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
