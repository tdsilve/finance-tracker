"use client";
import React from "react";

import { Form } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/generic/flex";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";

import { useSignUp } from "~/hooks/auth/useSignUp";

export const SignUpForm = () => {
  const { form, onSubmit, isPending } = useSignUp();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex col>
          <FormFieldWrapper
            control={form.control}
            name="email"
            label="Email"
            renderInput={(field) => <Input {...field} />}
          />
          <FormFieldWrapper
            control={form.control}
            name="password"
            label="Password"
            renderInput={(field) => <Input {...field} type="password" />}
          />

          <FormFieldWrapper
            control={form.control}
            name="username"
            label="Username"
            renderInput={(field) => <Input {...field} />}
          />
          <Button type="submit" disabled={isPending} loading={isPending}>
            Sign up
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
