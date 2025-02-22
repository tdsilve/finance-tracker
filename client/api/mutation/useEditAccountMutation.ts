import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { Account, MutationCallbacks } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";

export const useEditAccountMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({_id, name, amount }: Account) => {
      return fta.editAccount({_id, name, amount});
    },
    onSuccess: () => {
      toast.success("Account edited 111 successfully");
      onSuccess?.();
      client.invalidateQueries({ queryKey: "infinite-accounts" });
    },
    onError: (error) => {
      const message = getMessageFromHTTPError(error);
      toast.error(message);
    },
  });

  return mutation;
};
