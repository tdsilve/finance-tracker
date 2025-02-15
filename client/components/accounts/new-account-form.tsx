import React from "react";
import { Form } from "../ui/form";
import { FormFieldWrapper } from "../generic/form/FormFields";
import { useCreateNewAccount } from "~/hooks/accounts/useCreateNewAccount";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Flex } from "../generic/flex";
import {RiDeleteBinLine} from 'react-icons/ri';

export const NewAccountForm = () => {
  const { form, onSubmit, isPending } = useCreateNewAccount();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <Flex className="w-full p-4 max-w-md mx-auto" gap={4} col>
        <FormFieldWrapper
          control={form.control}
          name={"name"}
          label={"Name"}
     
          renderInput={(field) => <Input {...field} type={"text"}      placeholder={"e.g. Cash, Credit Card"} className="w-full" />}
        />
        <Button type="submit" disabled={isPending} loading={isPending}>
          Create Account
        </Button>
        <Button type="button" variant={"outline"} disabled={isPending} loading={isPending}>
         <RiDeleteBinLine/> Delete Account
        </Button>
        </Flex>
      </form>
    </Form>
  );
};
