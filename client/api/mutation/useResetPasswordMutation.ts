import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getMessageFromHTTPError } from "~/lib/error";
import { ResetPassword } from "~/model/types";

export const useResetPasswordMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data: ResetPassword) => {
      const response = await fetch(
        "http://localhost:8000/auth/reset-password",
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
        throw new Error(res.message);
      }
    },
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
