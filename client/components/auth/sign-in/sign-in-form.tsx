"use client";
import React from "react";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/generic/flex";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { useSignIn } from "~/hooks/auth/useSignIn";

export const SignInForm = () => {
  const { form, onSubmit, isPending } = useSignIn();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="on">
        <Flex col>
          <FormFieldWrapper
            control={form.control}
            name="email"
            label="Email"
            renderInput={(field) => <Input {...field} autoComplete="email" />}
          />
          <FormFieldWrapper
            control={form.control}
            name="password"
            label="Password"
            renderInput={(field) => <Input {...field} type="password" />}
          />

          <Button type="submit" disabled={isPending} loading={isPending}>
            Sign in
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
