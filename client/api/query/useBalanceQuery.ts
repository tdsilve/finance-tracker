import { useQuery } from "@tanstack/react-query";
import { fta } from "../finance-tracker-api";
import ms from "ms";

export const useBalanceQuery = () => {
  const query = useQuery({
    queryKey: ["balance"],
    queryFn: () => fta.balance(),
    refetchOnWindowFocus: true,
    staleTime: ms("1 hour"),
  });

  return query;
  // return {
  //   data:{ totalBalance: 0,
  //    totalIncome: 0,
  //    totalExpense: 0
  //   }
  // }
};
