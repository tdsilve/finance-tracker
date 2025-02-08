import React from "react";
import Link from "next/link";
import { cn } from "~/lib/utils";

type PrimaryLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const PrimaryLink = ({
  href,
  children,
  className,
}: PrimaryLinkProps) => {
  return (
    <Link href={href} className={cn("text-primary-500 font-bold", className)}>
      {children}
    </Link>
  );
};
