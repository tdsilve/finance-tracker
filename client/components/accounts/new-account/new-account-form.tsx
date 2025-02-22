import React from "react";
import { Form } from "../../ui/form";

import { useAccountForm } from "~/hooks/accounts/useAccountForm";
import { Button } from "../../ui/button";
import { Flex } from "../../generic/flex";
import { RiDeleteBinLine } from "react-icons/ri";

import { AccountsList } from "../accounts-list";

import { FormFieldWrapper } from "../../generic/form/FormFields";
import { Autocomplete } from "~/components/generic/auto-complete";
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
    desableDeleteBtn,
  } = useAccountForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto h-[87%] w-full max-w-[500px]"
      >
        <Flex className=" size-full   p-4" gap={4} col justify="between">
          <Flex col gap={2}>
            <FormFieldWrapper
              control={form.control}
              name={"name"}
              label={"Name"}
              className="flex flex-col"
              renderInput={(field) => (
                <Autocomplete
                  {...field}
                  content={(props) => (
                    <AccountsList
                      values={accounts}
                      selected={field.value as string}
                      setSelected={field.onChange}
                      setSelectedId={(id) => {
                        props?.setOpen?.(false);
                        setSelectedId(id as string);
                      }}
                      onMouseLeave={() => props?.setOpen?.(false)}
                    />
                  )}
                />
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
            <Button
              type="button"
              variant={"outline"}
              disabled={desableDeleteBtn}
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
