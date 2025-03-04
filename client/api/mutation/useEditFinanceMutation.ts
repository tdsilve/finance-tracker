import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { Finance, MutationCallbacks } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";
import { InfiniteData } from "~/lib/api/types";
import { optimistic } from "~/lib/react-query";

export const useEditFinanceMutation = ({ onSuccess }: MutationCallbacks) => {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ _id, name, amount, notes, category, date }: Finance) => {
      return fta.editFinance({ _id, name, amount, notes, category, date });
    },
    onSuccess: () => {
      toast.success("Finance edited successfully");
      client.invalidateQueries({
        queryKey: ["balance"],
      });
      onSuccess?.();
    },
    onError: (error) => {
      const message = getMessageFromHTTPError(error);
      toast.error(message);
    },
    ...optimistic<InfiniteData<Finance>, Finance>(
      client,
      ["infinite-finance", { fieldsSearch: "" }],
      (oldData, vars) => {
        const { _id, amount } = vars;

        const flatData = oldData.pages.flatMap((page) => page.content);

        const index = flatData?.findIndex((account) => account._id === _id);
        if (index === -1) return;
        flatData[index].amount = amount;
      },
    ),
  });

  return mutation;
};
