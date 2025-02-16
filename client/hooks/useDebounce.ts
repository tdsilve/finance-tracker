"use client";
import React from "react";

type UseDebounceArgs = {
  value: any;
  delay: number;
};

export const useDebounce = ({ value, delay = 500 }: UseDebounceArgs) => {
  const [debouncedValue, setDebouncedValue] = React.useState<any>(value);
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
};

export const udeDebounceFunction = <T extends (...args: any[]) => void> (fn: T, delay: number  = 500) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function(...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), delay);
  } as T;
}
