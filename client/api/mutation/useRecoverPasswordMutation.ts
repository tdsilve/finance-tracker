import { useMutation } from "@tanstack/react-query";
import { RecoverPassword } from "~/model/types";
import { getMessageFromHTTPError } from "~/lib/error";
import toast from "react-hot-toast";
import { fta } from "../finance-tracker-api";

export const useRecoverPasswordMutation = () =>
  useMutation({
    mutationFn: async (data: RecoverPassword) =>
      fta.sendResetPasswordEmail(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
  });
