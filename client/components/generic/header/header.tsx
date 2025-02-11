import React from "react";
import { Flex } from "../flex";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation/navigation";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-primary-600 to-primary-400 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <Flex className="w-full mb-14" justify="between" items="center">
          <Flex items="center" className="lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </Flex>
        </Flex>
      </div>
    </header>
  );
};
