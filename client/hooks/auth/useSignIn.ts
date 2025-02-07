import React from 'react'
import { useSingInMutation } from "~/api/mutation/useSigninMutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "~/model/schemas";
import { SignIn } from "~/model/types";
import { useRouter } from 'next/navigation';

export const useSignIn = () => {
    const router = useRouter();
   const { mutate, isPending } = useSingInMutation({
    onSuccess: () => {
      router.push("/");
    },
   });
    const form = useForm({
      mode: "onChange",
      resolver: zodResolver(SignInSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });
  
    const onSubmit = (data: SignIn) => {
      mutate(data);
    };

    return {form, onSubmit, isPending}
}
