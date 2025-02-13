import { useMutation } from "@tanstack/react-query";
import { SignIn } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";
import toast from "react-hot-toast";
import { fta } from "~/api/finance-tracker-api";

type SingInMutationProps = {
  onSuccess?: () => void;
};

export const useSingInMutation = (props?: SingInMutationProps) => {
  return useMutation({
    mutationFn: (data: SignIn) => fta.signIn(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      toast.success("Logged in successfully");

      props?.onSuccess?.();
    },
  });
};
