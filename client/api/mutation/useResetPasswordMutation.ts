import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getMessageFromHTTPError } from "~/lib/error";
import { ResetPassword } from "~/model/types";
import { fta } from "../finance-tracker-api";

export const useResetPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ResetPassword) => fta.resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/sign-in");
    },
    onError: (error) => {
      const message = getMessageFromHTTPError(error);
      toast.error(message);
    },
  });
};
