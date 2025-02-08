import React from "react";
import { Flex } from "~/components/generic/Flex";
import { Logo } from "~/components/generic/Logo";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function RecoverPasswordPage(props: {
  searchParams: SearchParams;
}) {
  const params = (await props.searchParams).token;

  return (
    <Flex col gap={4} items="center" justify="center" className="w-full h-full">
      <Logo />
    </Flex>
  );
}
