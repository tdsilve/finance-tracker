import React from "react";
import { Flex } from "../../flex";
import { NavigationList } from "./navigation-list";

export const NavigationDesktop = () => {
  return (
    <Flex items="center" className="gap-x-3">
      <NavigationList />
    </Flex>
  );
};
