import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { MutationCallbacks, NewFinance } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";

export const useNewFinanceMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ name, amount, notes, category, date }: NewFinance) => {
      return fta.createFinance({ name, amount, notes, category, date });
    },
    onSuccess: () => {
      toast.success("Finance created successfully");
      onSuccess?.();
      client.invalidateQueries({
        queryKey: ["infinite-finance", { fieldsSearch: "" }],
      });
    },
    onError: (error) => {
      const message = getMessageFromHTTPError(error);
      toast.error(message);
    },
  });

  return mutation;
};
