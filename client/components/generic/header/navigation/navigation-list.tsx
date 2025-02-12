import React from "react";
import { NavigationItem } from "./navigation-item";
import { routes } from "~/model/constants";

export const NavigationList = () => {
  return (
    <>
      {routes?.map(({ href, label }) => (
        <NavigationItem key={href} href={href} label={label} />
      ))}
    </>
  );
};
