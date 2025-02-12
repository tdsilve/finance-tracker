"use client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMessageFromHTTPError, HTTPError } from "~/lib/error";
import { fta } from "../finance-tracker-api";
import { useRouter } from "next/navigation";
import { deleteCookies } from "~/api/server-actions/delete-cookies";


export const useLogoutMutation = () => {
  const router = useRouter();



  return useMutation({
    mutationFn: () => {

      return fta.logout();
    },
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: async () => {
      try {
  
        await deleteCookies();
        router.push("/sign-in");
      } catch (error) {
        toast.error(getMessageFromHTTPError(error as HTTPError));
      }
    },
  });
};
