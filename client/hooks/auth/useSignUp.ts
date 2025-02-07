import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "~/model/schemas";
import { SignUp } from "~/model/types";
import { useSingUpMutation } from "~/api/mutation/useSignUpMutation";
import { useRouter } from "next/navigation";

export const useSignUp = () => {
  const router = useRouter();
  const { mutate, isPending } = useSingUpMutation({
    onSuccess: () => {
      router.push("/sign-in");
    },
  });
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (data: SignUp) => {
    mutate(data);
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
