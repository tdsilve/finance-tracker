"use client";
import React from "react";
import { ResetPasswordForm } from "./reset-password-form";
import { Flex } from "~/components/generic/Flex";
import { Header } from "../header";
import { ErrorAlert } from "~/components/generic/alert/ErrorAlert";
import { PrimaryLink } from "~/components/generic/link/PrimaryLink";

type ResetPasswordProps = { token?: string };

export const ResetPassword = ({ token }: ResetPasswordProps) => {
  if (!token) {
    return (
      <ErrorAlert
        message="An error has occurred. Your reset link may be invalid or expired."
        action={
          <div className="text-center">
            Go back to
            <PrimaryLink href="/sign-in" className=" mx-1">
              sign in
            </PrimaryLink>
            page
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
      <div className="text-center text-sm">
        Go back to
        <PrimaryLink href="/sign-in" className="mx-1">
          sign in
        </PrimaryLink>
        page
      </div>
    </Flex>
  );
};
