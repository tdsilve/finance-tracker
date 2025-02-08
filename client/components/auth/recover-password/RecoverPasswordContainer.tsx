"use client";
import React from "react";
import { Flex } from "~/components/generic/Flex";
import Image from "next/image";
import CheckIcon from "~/assets/images/svg/check.svg";
import { Header } from "../Header";

import { RecoverPasswordForm } from "./RecoverPasswordForm";
import { PrimaryLink } from "~/components/generic/link/PrimaryLink";

const BottomLink = () => {
  return (
    <PrimaryLink href="/sign-in" className="text-center text-sm">
      Go back
    </PrimaryLink>
  );
};

export const RecoverPasswordContainer = () => {
  const [isSuccess, setIsSuccess] = React.useState(false);

  if (isSuccess) {
    return (
      <Flex col justify="center" items="center">
        <Image src={CheckIcon} width={100} height={100} alt="check icon" />
        <Header
          title="Email sent"
          subtitle="We've sent you an email with instructions to reset your password. Please check your inbox and follow the link provided."
        />
        <BottomLink />
      </Flex>
    );
  }
  return (
    <Flex col gap={4}>
      <Header
        title="Forgot your password?"
        subtitle="Enter your email to receive a reset link and regain access."
      />
      <RecoverPasswordForm onSuccess={setIsSuccess} />
      <BottomLink />
    </Flex>
  );
};
