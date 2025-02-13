import { useQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import React from "react";
import toast from "react-hot-toast";
import { getMessageFromHTTPError, HTTPError, HTTPErrorCode } from "~/lib/error";

import { handleDeleteCookiesAndRedirect } from "~/utils/auth";
import { userStore } from "~/store/user";

export const useMeQuery = () => {
  const setUser = userStore((state) => state.setUser);
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => fta.me(),
    staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale

  });
  React.useEffect(() => {
    if (query.error) {
      if (query.error.status === HTTPErrorCode.UNAUTHORIZED) {
        handleDeleteCookiesAndRedirect();
      }
      toast.error(getMessageFromHTTPError(query.error as HTTPError));
    }
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
  }, [query.error, query.data, query.isSuccess, setUser]);

  return query;
};
