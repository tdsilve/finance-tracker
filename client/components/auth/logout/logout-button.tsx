"use client";
import React from "react";
import { useLogoutMutation } from "~/api/mutation/useLogoutMutation";
import { Button } from "~/components/ui/button";

export const LogoutButton = () => {
  const { mutate: logout } = useLogoutMutation();

  return <Button onClick={() => logout()}>Logout</Button>;
};
