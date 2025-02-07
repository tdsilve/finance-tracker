import { useMutation } from "@tanstack/react-query";
import { SignUp } from "~/model/types";
import toast from "react-hot-toast";
import { getMessageFromHTTPError, HTTPError } from "~/lib/error";

type SingUpMutationProps = {
  onSuccess?: () => void;
};

export const useSingUpMutation = (props?: SingUpMutationProps) =>
  useMutation({
    mutationFn: async (data: SignUp) => {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (!response.ok)
        throw new HTTPError(response.statusText, response.status, res);
    },
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      toast.success("User created");
      props?.onSuccess?.();
    },
  });
