"use client";

import React from "react";
import { NavigationDesktop } from "./navigation-desktop";
import { NavigationMobile } from "./navigation-mobile";
import { useIsMobileScreen } from "~/hooks/useIsMobileScreen";

export const Navigation = () => {
  const isMobile = useIsMobileScreen(1024);

  const children = isMobile ? <NavigationMobile /> : <NavigationDesktop />;
  return <nav>{children}</nav>;
};
