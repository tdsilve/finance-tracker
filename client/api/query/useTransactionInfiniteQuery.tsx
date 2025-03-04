/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import ms from "ms";

type UseTransactionInfiniteQueryProps = {
  limit?: number;
  fieldsSearch?: string;
  enabeled?: boolean;
  onSuccess?: () => void;
  sorted?: boolean;
  pageParam?: number;
};

export const useTransactionInfiniteQuery = ({
  limit = 10,
  fieldsSearch = "",
  enabeled = true,
  sorted = true,
  pageParam = 1,
}: UseTransactionInfiniteQueryProps) => {
  const query = useInfiniteQuery({
    queryKey: ["infinite-finance", { fieldsSearch }, { limit }, { pageParam }],
    queryFn: ({ pageParam }) =>
      fta.getTransaction(pageParam, limit, fieldsSearch, sorted),
    initialPageParam: pageParam,
    getNextPageParam: (lastPage, pages) =>
      !lastPage.last ? lastPage.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    enabled: enabeled,
    placeholderData: keepPreviousData,
    staleTime: ms("10 minutes"),
  });

  return query;
};
