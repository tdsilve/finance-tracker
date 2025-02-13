"use client";
import React from "react";
import { Heading } from "../heading";
import { userStore } from "~/store/user";


export const WelcomeMessage = () => {
  const user = userStore((state) => state.user);

  return (
    <div className="space-y-2 text-white">
      <Heading>Welcome Back {user?.username} 👋</Heading>
      <p className="text-sm lg:text-base">
        This is your financial overview report
      </p>
    </div>
  );
};
