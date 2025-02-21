import React from "react";
import { Form } from "../..//ui/form";

import { useCreateNewAccount } from "~/hooks/accounts/useCreateNewAccount";
import { Button } from "../../ui/button";
import { Flex } from "../../generic/flex";
import { RiDeleteBinLine } from "react-icons/ri";

import { AccountsList } from "../../generic/auto-complete";

import { FormFieldWrapper } from "../../generic/form/FormFields";
import { PopoverDemo } from "~/components/generic/auto-complete copy";
import { Input } from "~/components/ui/input";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-[87%] w-full">
        <Flex
          className="mx-auto size-full border  p-4"
          gap={4}
          col
          justify="between"
        >
          <FormFieldWrapper
            control={form.control}
            name={"name"}
            label={"Name"}
            className="flex flex-col"
            renderInput={(field) => (
              <PopoverDemo
                content={(props) => (
                  <AccountsList
                    values={accounts}
                    selected={field.value}
                    setSelected={field.onChange}
                    setSelectedId={(id) => {
                      props?.setOpen?.(false);
                      setSelectedId(id as string);
                    }}
                    onMouseLeave={() => props?.setOpen?.(false)}
                  />
                )}
              >
                {({ bind, setOpen }) => (
                  <Input
                    {...bind}
                    onMouseEnter={() => setOpen(true)}
                    {...field}
                    placeholder="e.g. Cash, Credit Card"
                  />
                )}
              </PopoverDemo>
            )}
          />

          <Flex col gap={2}>
            <Button type="submit" disabled={isPending} loading={isPending}>
              Create Account
            </Button>
            <Button
              type="button"
              variant={"outline"}
              disabled={
                deleteAccount.isPending || form.getValues("name") === ""
              }
              loading={deleteAccount.isPending}
              onClick={handleDeleteAccount}
            >
              <RiDeleteBinLine /> Delete Account
            </Button>
          </Flex>
        </Flex>
      </form>
    </Form>
  );
};
