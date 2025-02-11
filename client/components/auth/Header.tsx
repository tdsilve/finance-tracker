import React from "react";
import { Flex } from "~/components/generic/flex";
import { Heading } from "~/components/generic/heading";

type HeaderProps = {
  title: string;
  subtitle: string;
};
export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <Flex justify="center" col className="w-full text-center" gap={2}>
      <Heading tag="h2">{title}</Heading>

      <p className="font-thin">{subtitle}</p>
    </Flex>
  );
};
