import { useMutation } from "@tanstack/react-query";
import { Logout } from "~/model/types";
import toast from "react-hot-toast";
import { getMessageFromHTTPError } from "~/lib/error";
import { fta } from "../finance-tracker-api";
import { useRouter } from "next/navigation";


export const useLogoutMutation = () =>{
  const router = useRouter();
 return useMutation({
    mutationFn: async (data: Logout) => fta.logout(data),
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: () => {
      router.push("/sign-in");
    }
  })
};
