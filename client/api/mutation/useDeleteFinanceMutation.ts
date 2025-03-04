import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import { Finance } from "~/model/types";
import toast from "react-hot-toast";
import { MutationCallbacks } from "~/model/types";

export const useDeleteFinanceMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (ids: Finance["_id"][]) => fta.deleteFinance(ids),
    onSuccess: () => {
      onSuccess?.();
      toast.success("Finance deleted successfully");
      client.invalidateQueries({ queryKey: ["infinite-finance"] });
      client.invalidateQueries({ queryKey: ["balance"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
