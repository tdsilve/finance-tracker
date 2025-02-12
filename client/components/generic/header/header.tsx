import React from "react";
import { Flex } from "../flex";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation/navigation";
import { UserButton } from "../user/UserButton";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-primary-600 to-primary-400 px-4 py-8 pb-36 lg:px-14">
      <div className="mx-auto max-w-screen-2xl">
        <Flex className="mb-14 w-full" justify="between" items="center">
          <Flex items="center" className="lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </Flex>
          <UserButton />
        </Flex>
      </div>
    </header>
  );
};
