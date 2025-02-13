import React from "react";
import { cn } from "~/lib/css";

type LoadingProps = {
  size?: number;
  className?: string;
};

export const Loading = ({ size = 80, className }: LoadingProps) => {
  return (
    <div
      className={cn(
        " animate-spin rounded-full border-2 border-primary-200 border-t-transparent",
        className,
      )}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};
