import React from "react";
import { Form } from "~/components/ui/form";
import { FormFieldWrapper } from "~/components/generic/form/FormFields";
import { useRecoverPassword } from "~/hooks/auth/useRecoverPassword";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Flex } from "~/components/generic/Flex";
import Image from "next/image";
import CheckIcon from "~/assets/images/svg/check.svg";
import { Header } from "../Header";
import Link from "next/link";
import {
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";

type RecoverPasswordFormProps = {
  onSuccess: (val: boolean) => void;
};

export const RecoverPasswordForm = ({
  onSuccess,
}: RecoverPasswordFormProps) => {
  const { form, onSubmit, isPending, isSuccess } =
    useRecoverPassword(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Flex col gap={4}>
          <FormFieldWrapper
            control={form.control}
            name="email"
            label="Email"
            renderInput={(field) => <Input {...field} type="email" />}
          />

          <Button type="submit" disabled={isPending} loading={isPending}>
            Recover password
          </Button>
        </Flex>
      </form>
    </Form>
  );
};
