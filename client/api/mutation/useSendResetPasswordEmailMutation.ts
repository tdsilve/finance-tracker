import { useMutation } from "@tanstack/react-query";
import { SendResetPasswordEmail } from "~/model/types";
import { HTTPError, getMessageFromHTTPError } from "~/lib/error";
import toast from "react-hot-toast";

export const useSendResetPasswordEmailMutation = () =>
  useMutation({
    mutationFn: async (data: SendResetPasswordEmail) => {
      const response = await fetch(
        "http://localhost:8000/auth/send-reset-password-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const res = await response.json();
      if (!response.ok) {
        throw new HTTPError(response.statusText, response.status, res);
      }
    },
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
  });
