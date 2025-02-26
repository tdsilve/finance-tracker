"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getMessageFromHTTPError, HTTPError } from "~/lib/error";
import { fta } from "../finance-tracker-api";

import { handleDeleteCookiesAndRedirect } from "~/utils/auth";

export const useLogoutMutation = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return fta.logout();
    },
    onError: (error) => {
      toast.error(getMessageFromHTTPError(error));
    },
    onSuccess: async () => {
      try {
        await handleDeleteCookiesAndRedirect();
        client.clear();
      } catch (error) {
        toast.error(getMessageFromHTTPError(error as HTTPError));
      }
    },
  });
};
