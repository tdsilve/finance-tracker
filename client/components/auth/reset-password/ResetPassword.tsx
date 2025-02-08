"use client";
import React from "react";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { Flex } from "~/components/generic/Flex";
import { Header } from "../Header";
import { ErrorAlert } from "~/components/generic/alert/ErrorAlert";
import Link from "next/link";

type ResetPasswordProps = { token: string };

export const ResetPassword = ({ token }: ResetPasswordProps) => {
  if (!token) {
    return (
      <ErrorAlert
        message="Invalid or expired reset link. Please request a new one."
        action={
          <div>
            Or go back to{" "}
            <Link href="/sign-in" className="underline">
              sign in
            </Link>
          </div>
        }
      />
    );
  }
  return (
    <Flex col gap={4}>
      <Header
        title="Reset Your Password"
        subtitle="Enter your new password below to securely regain access to your account."
      />
      <ResetPasswordForm token={token} />
    </Flex>
  );
};
