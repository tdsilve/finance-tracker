"use client";
import { Route } from "~/model/types";
import { cn } from "~/lib/css";
import { useIsActiveLink } from "~/hooks/useIsActiveLink";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";
import { on } from "events";

type NavigationItemProps = {
  onClick?: () => void;
} & Route;

export const NavigationItem = ({ label, href, onClick }: NavigationItemProps) => {
  const isActive = useIsActiveLink(href);
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "lg:text-white lg:hover:bg-white/20 hover:bg-gray-100 lg:bg-transparent  border-none transition ",
        isActive && "lg:bg-white/10 bg-primary-100",
      )}
   onClick={() => onClick?.()}
    >
      {label}
    </Link>
  );
};
