import React from "react";

enum BankAccountStatus {
  Negative = "🔴",
  Positive = "🟢",
  Zero = "🟡",
}

function getStatus(amount: number | string) {
  const val = typeof amount === "string" ? parseFloat(amount) : amount;
  if (val > 0) return BankAccountStatus.Positive;
  if (val < 0) return BankAccountStatus.Negative;
  return BankAccountStatus.Zero;
}

export const ColumnStatus = ({ val }: { val: number | string }) => {
  const status = getStatus(val);
  return <div className="px-3">{status}</div>;
};
