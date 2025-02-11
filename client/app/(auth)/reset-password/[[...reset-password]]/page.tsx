import React from "react";
import { ResetPassword } from "~/components/auth/reset-password/reset-password";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default async function RecoverPasswordPage(props: {
  searchParams: SearchParams;
}) {
  const token = (await props.searchParams).token as string | undefined;

  return <ResetPassword token={token} />;
}
