/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";

type UseAccountsInfiniteQueryProps = {
  limit?: number;
  fieldsSearch?: string;
  enabeled?: boolean;
};

export const useAccountsInfiniteQuery = ({
  limit = 10,
  fieldsSearch,
  enabeled = true,
}: UseAccountsInfiniteQueryProps) => {
  const query = useInfiniteQuery({
    queryKey: ["infinite-accounts"],
    queryFn: ({ pageParam = 1 }) =>
      fta.getAccounts(pageParam, limit, fieldsSearch),
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
  });

  return query;
};
