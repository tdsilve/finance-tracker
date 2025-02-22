import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import { Account } from "~/model/types";
import toast from "react-hot-toast";
import { MutationCallbacks } from "~/model/types";

export const useDeleteAccountMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: Account["_id"]) => fta.deleteAccount(id),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Account deleted successfully");
      client.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
