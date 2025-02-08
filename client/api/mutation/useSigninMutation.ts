import { useMutation } from "@tanstack/react-query";
import { SignIn } from "~/model/types";
import { HTTPError, getMessageFromHTTPError } from "~/lib/error";
import toast from "react-hot-toast";
import { fta } from "~/api/finance-tracker-api";
import { TypedBody } from "~/lib/api/types";

type SingInMutationProps = {
  onSuccess?: () => void;
};

export const useSingInMutation = (props?: SingInMutationProps) =>
  useMutation({
    mutationFn: async (data: SignIn) => await fta.signIn(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      props?.onSuccess?.();
    },
  });
