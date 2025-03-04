"use client";
import React from "react";
import { Flex } from "~/components/generic/flex";
import { Heading } from "~/components/generic/heading";
import { Card } from "~/components/ui/card";
import { RiArrowUpLine } from "react-icons/ri";
import { cn } from "~/lib/css";
import { useBalanceQuery } from "~/api/query/useBalanceQuery";

const Value = ({ value }: { value: number }) => {
  return <div className="text-xl font-bold text-white">$ {value}</div>;
};

const BalanceCard = ({
  label,
  value,
  isIncome,
}: {
  label: string;
  value: number;
  isIncome?: boolean;
}) => {
  return (
    <Flex
      col
      gap={2}
      className="rounded-md bg-primary-700 p-4 text-center shadow-[0_0_3px_#fff]"
    >
      <Flex items="center">
        <span
          className={cn(
            isIncome ? "text-green-500" : "rotate-180 text-red-500",
            "font-extrabold",
          )}
        >
          <RiArrowUpLine />
        </span>
        {label}
      </Flex>
      <Value value={value} />
    </Flex>
  );
};

export const TotalBalance = () => {
  const { data } = useBalanceQuery();

  return (
    <div>
      <Card className="mx-auto w-fit bg-primary-600 p-4 text-[#F4F7FF]/70">
        <div className="text-center ">
          <Heading tag="h6">Total Ballance</Heading>
          <Value value={data?.totalBalance ?? 0} />
        </div>
        <Flex gap={2} className="mt-2 " items="center" justify="center">
          <BalanceCard label="Income" value={data?.totalIncome ?? 0} isIncome />
          <BalanceCard label="Expense" value={data?.totalExpense ?? 0} />
        </Flex>
      </Card>
    </div>
  );
};
