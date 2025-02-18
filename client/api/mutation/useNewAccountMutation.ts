import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { MutationCallbacks } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";

export const useNewAccountMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: (name: string) => {
      return fta.createAccount(name);
    },
    onSuccess: () => {
      toast.success("Account created successfully");
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
