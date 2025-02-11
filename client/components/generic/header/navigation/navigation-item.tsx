"use client";
import { Route } from "./navigation-desktop"
import { cn } from "~/lib/css";
import { useIsActiveLink } from "~/hooks/useIsActiveLink";
import { buttonVariants } from "~/components/ui/button";
import Link from "next/link";

type NavigationItemProps = Route;

export const NavigationItem = ({ label, href }:NavigationItemProps) => {
    const isActive = useIsActiveLink(href)
    return (
        <Link href={href} className={cn(buttonVariants({ variant: "outline" }), "text-white hover:bg-white/20 border-none transition", isActive && "bg-white/10")}>
            {label}
        </Link>
    )
}