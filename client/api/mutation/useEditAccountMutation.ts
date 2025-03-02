import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { EditAccount, MutationCallbacks } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";

export const useEditAccountMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ _id, name, amount }: EditAccount) => {
      return fta.editAccount({ _id, name, amount });
    },
    onSuccess: () => {
      toast.success("Account edited successfully");
      client.invalidateQueries({
        queryKey: ["infinite-accounts"],
      });
      onSuccess?.();
    },
    onError: (error) => {
      const message = getMessageFromHTTPError(error);
      toast.error(message);
    },
  });

  return mutation;
};
