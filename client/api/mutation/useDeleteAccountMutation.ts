import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import { Account } from "~/model/types";
import toast from "react-hot-toast";

type UseDeleteAccountMutationArgs = {
  onSuccess?: () => void;
};

export const useDeleteAccountMutation = ({
  onSuccess,
}: UseDeleteAccountMutationArgs) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (id: Account["id"]) => fta.deleteAccount(id),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Account deleted successfully");
      client.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
