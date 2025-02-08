import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "~/api/mutation/useResetPasswordMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "~/model/schemas";
import { ResetPassword } from "~/model/types";

export const useResetPassword = (token: string) => {
  const { mutate, isPending, isSuccess } = useResetPasswordMutation();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { token: token, password: "" },
  });
  const onSubmit = (data: ResetPassword) => {
    console.log("onSubmit", data);
    mutate(data);
  };
  return { form, onSubmit, isPending, isSuccess };
};
