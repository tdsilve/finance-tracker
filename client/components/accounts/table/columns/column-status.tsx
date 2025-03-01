import React from "react";

enum BankAccountStatus {
  Negative = "🔴",
  Positive = "🟢",
  Zero = "🟡",
}

function getStatus(amount: number) {
  if (amount > 0) return BankAccountStatus.Positive;
  if (amount < 0) return BankAccountStatus.Negative;
  return BankAccountStatus.Zero;
}

export const ColumnStatus = ({ val }: { val: number }) => {
  const status = getStatus(val);
  return <div className="px-3">{status}</div>;
};
