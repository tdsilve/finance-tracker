import { useMutation } from "@tanstack/react-query";
import { SignIn } from "~/model/types";
import { HTTPError, getMessageFromHTTPError } from "~/lib/error";
import toast from "react-hot-toast";

type SingInMutationProps = {
  onSuccess?: () => void;
};

export const useSingInMutation = (props?: SingInMutationProps) =>
  useMutation({
    mutationFn: async (data: SignIn) => {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new HTTPError(response.statusText, response.status, res);
      }
    },
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      props?.onSuccess?.();
    },
  });
