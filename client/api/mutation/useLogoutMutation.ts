import { useMutation } from "@tanstack/react-query";
import { Logout } from "~/model/types";
import toast from "react-hot-toast";
import { getMessageFromHTTPError } from "~/lib/error";
import { fta } from "../finance-tracker-api";
import { useRouter } from "next/navigation";
import { deleteCookies } from "~/api/server-actions/delete-cookies";

export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Logout) => fta.logout(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: async () => {
      try {
        await deleteCookies();
        router.push("/sign-in");
      } catch () {
        // toast.error(getMessageFromHTTPError(error));
      }
    },
  });
};
