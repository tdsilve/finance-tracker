import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { NewAccountSchema } from "~/model/schemas";
import { NewAccount } from "~/model/types";

export const useCreateNewAccount = () => {
  const form = useForm({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: NewAccount) => {
    console.log(data);
  };
  const isPending = false;
  return { form, onSubmit, isPending };
};
