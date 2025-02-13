"use client";
import React from "react";
import { NavigationDesktop } from "./navigation-desktop";
import { NavigationMobile } from "./navigation-mobile";

export const Navigation = () => {
  return (
    <nav>
      <div className="block lg:hidden">
        <NavigationMobile />
      </div>
      <div className="hidden lg:block">
        <NavigationDesktop />
      </div>
    </nav>
  );
};
