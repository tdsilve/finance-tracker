import { SignUpForm } from "~/components/auth/sign-up/SignUpForm";

import { Header } from "~/components/auth/Header";
import { PrimaryLink } from "~/components/generic/link/PrimaryLink";

export default function SignUpPage() {
  return (
    <>
      <Header title="Welcome" subtitle="Sign up to track your finances." />

      <div className="w-full">
        <SignUpForm />
      </div>

      <div className="text-sm text-center w-full">
        <span className="font-thin">Already have an account?</span>{" "}
        <PrimaryLink href="/sign-in">Sign in</PrimaryLink>
      </div>
    </>
  );
}
