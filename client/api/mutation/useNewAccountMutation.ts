import { useMutation } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import toast from "react-hot-toast";
import { MutationCallbacks } from "~/model/types";


export const useNewAccountMutation = ({ onSuccess}: MutationCallbacks ) => {
  const mutation = useMutation({
    mutationFn: (name: string) => {
      return fta.createAccount(name);
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};