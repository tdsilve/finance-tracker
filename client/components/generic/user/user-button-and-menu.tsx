"use client";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import Link from "next/link";

import React from "react";
import { LogoutButton } from "~/components/auth/logout/logout-button";

export const UserButtonAndMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"rounded-full-fit"}>
          <UserAvatar name="Thais" profileImage="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
