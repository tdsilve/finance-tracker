"use client";
import { usePathname } from "next/navigation";

export const useIsActiveLink = (href: string) => {
  const pathname = usePathname();
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};
