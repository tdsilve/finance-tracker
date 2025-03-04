import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import { Transaction } from "~/model/types";
import toast from "react-hot-toast";
import { MutationCallbacks } from "~/model/types";

export const useDeleteTransactionMutation = ({
  onSuccess,
}: MutationCallbacks) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (ids: Transaction["_id"][]) => fta.deleteTransaction(ids),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Transaction deleted successfully");
      client.invalidateQueries({ queryKey: ["infinite-finance"] });
      client.invalidateQueries({ queryKey: ["balance"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
