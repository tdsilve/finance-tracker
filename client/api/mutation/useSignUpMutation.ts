import { useMutation } from "@tanstack/react-query";
import { SignUp } from "~/model/types";
import toast from "react-hot-toast";
import { getMessageFromHTTPError } from "~/lib/error";
import { fta } from "../finance-tracker-api";
import { MutationCallbacks } from "~/model/types";


export const useSingUpMutation = (props?: MutationCallbacks) =>
  useMutation({
    mutationFn: (data: SignUp) => fta.signUp(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      toast.success("User created");
      props?.onSuccess?.();
    },
  });
