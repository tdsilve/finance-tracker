import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { NewAccountSchema } from "~/model/schemas";
import { NewAccount} from "~/model/types";
import { useNewAccountMutation } from "~/api/mutation/useNewAccountMutation";
import { useAccountsInfiniteQuery } from "~/api/query/useAccountsInfiniteQuery";
import { useDebounce } from "../useDebounce";

export const useCreateNewAccount = () => {
 
  const {mutate} = useNewAccountMutation({onSuccess: () => form.reset()});
  const form = useForm({
    resolver: zodResolver(NewAccountSchema),
    defaultValues: { name: "" },
  });
  const {data} = useAccountsInfiniteQuery({enabeled: form.getValues("name").length > 0});
  console.log(data);

  const onSubmit = (data: NewAccount) => {
    mutate(data.name);
  };
  const isPending = false;
  return { form, onSubmit, isPending, accounts: useDebounce({value: data?.pages.flatMap(page => page.content) ?? [], delay: 500}) };
};
