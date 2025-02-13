"use client";
import React from "react";
import { Heading } from "../heading";

export const WelcomeMessage = () => {
  return (
    <div className="space-y-2 text-white">
      <Heading>Welcome Back 👋</Heading>
      <p className="text-sm lg:text-base">
        This is your financial overview report
      </p>
    </div>
  );
};
