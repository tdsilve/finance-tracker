"use client";
import { usePathname } from "next/navigation";

export const useIsActiveLink = (href: string) => {
  const pathname = usePathname();
  return pathname.startsWith(href);
};
