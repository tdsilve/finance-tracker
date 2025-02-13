"use client";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

import React from "react";
import { LogoutButton } from "~/components/auth/logout/logout-button";
import { useMeQuery } from "~/api/query/useMeQuery";
import { Loading } from "../loading/loading";
import { cn } from "~/lib/css";

const items = [
  {
    key: "profile",
    child: (
      <Link
        href="/profile"
        className={cn(buttonVariants({ variant: "ghost" }), "text-center")}
      >
        Profile
      </Link>
    ),
  },
  { key: "logout", child: <LogoutButton /> },
];

export const UserButtonAndMenu = () => {
  const { data: user, isLoading } = useMeQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"rounded-full-fit"}>
          {isLoading ? (
            <Loading size={30} />
          ) : (
            <UserAvatar name={user?.username} profileImage="" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-white p-0 text-center">
        <DropdownMenuGroup>
          {items?.map((item) => (
            <DropdownMenuItem key={item.key} className="justify-center">
              {item.child}{" "}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
