import { useQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import React from "react";
import toast from "react-hot-toast";
import { getMessageFromHTTPError, HTTPError, HTTPErrorCode } from "~/lib/error";

import { handleDeleteCookiesAndRedirect } from "~/utils/auth";

export const useMeQuery = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () => fta.me(),
    refetchInterval: 1000 * 60 * 60 * 24,
  });
  React.useEffect(() => {
    if (query.error) {
      if (query.error.status === HTTPErrorCode.UNAUTHORIZED) {
        handleDeleteCookiesAndRedirect();
      }
      toast.error(getMessageFromHTTPError(query.error as HTTPError));
    }
  }, [query.error]);

  return query;
};
