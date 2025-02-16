import { useInfiniteQuery, } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";

type UseAccountsInfiniteQueryProps = {
  page?: number;
  limit?: number;
  fieldsSearch?: string;
};

export const useAccountsInfiniteQuery = ({page= 1, limit = 10, fieldsSearch}: UseAccountsInfiniteQueryProps) => {

  const query = useInfiniteQuery({
    queryKey: ["infinite-accounts"],
    queryFn: ({ pageParam = 1}) => fta.getAccounts(pageParam, limit, fieldsSearch),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => !lastPage.last ? lastPage.currentPage + 1 : undefined,
  });


  return query;
};
