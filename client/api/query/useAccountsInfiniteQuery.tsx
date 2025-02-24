/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import ms from "ms";

type UseAccountsInfiniteQueryProps = {
  limit?: number;
  fieldsSearch?: string;
  enabeled?: boolean;
  onSuccess?: () => void;
  sorted?: boolean;
};

export const useAccountsInfiniteQuery = ({
  limit = 10,
  fieldsSearch = "",
  enabeled = true,
  sorted = true,
}: UseAccountsInfiniteQueryProps) => {
  const query = useInfiniteQuery({
    queryKey: ["infinite-accounts", { fieldsSearch }],
    queryFn: ({ pageParam = 1 }) =>
      fta.getAccounts(pageParam, limit, fieldsSearch, sorted),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      !lastPage.last ? lastPage.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    enabled: enabeled,
    placeholderData: (prev) => prev,
    staleTime: ms("10 minutes"),
  });

  return query;
};
