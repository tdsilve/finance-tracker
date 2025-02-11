"use client";
import React from "react";
import { Flex } from "~/components/generic/flex";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useResetPassword } from "~/hooks/auth/useResetPassword";
type ResetPasswordProps = { token: string };

export const ResetPasswordForm = ({ token }: ResetPasswordProps) => {
  const { form, onSubmit, isPending } = useResetPassword(token);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex gap={4} col className="w-full">
          <FormFieldWrapper
            control={form.control}
            name="password"
            label="Password"
            renderInput={(field) => <Input {...field} type="password" />}
          />
          <Button type="submit" disabled={isPending} loading={isPending}>
            Reset password
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
