import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { RecoverPasswordSchema } from "~/model/schemas";
import { RecoverPassword } from "~/model/types";
import { useForm } from "react-hook-form";
import { useRecoverPasswordMutation } from "~/api/mutation/useRecoverPasswordMutation";

export const useRecoverPassword = (onSuccess?: (val: boolean) => void) => {
  const { mutate, isPending, isSuccess } = useRecoverPasswordMutation();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(RecoverPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: RecoverPassword) => {
    mutate(data);
  };

  React.useEffect(() => {
    onSuccess?.(isSuccess);
  }, [isSuccess, onSuccess]);
  return { form, onSubmit, isPending, isSuccess };
};
