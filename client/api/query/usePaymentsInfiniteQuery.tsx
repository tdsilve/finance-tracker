/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";

type UsePaymentsInfiniteQueryProps = {
  limit?: number;
  name?: string;
  enabeled?: boolean;
};

export const usePaymentsInfiniteQuery = ({
  limit = 10,
  name,
  enabeled = true,
}: UsePaymentsInfiniteQueryProps = {}) => {
  const query = useInfiniteQuery({
    queryKey: ["infinite-payments"],
    queryFn: ({ pageParam = 1 }) => fta.getPayments(pageParam, limit, name),
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
