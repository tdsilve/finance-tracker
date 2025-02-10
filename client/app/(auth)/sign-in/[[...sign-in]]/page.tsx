import { SignInForm } from "~/components/auth/sign-in/SignInForm";
import Link from "next/link";
import { Header } from "~/components/auth/Header";
import { PrimaryLink } from "~/components/generic/link/PrimaryLink";

export default function SignInPage() {
  return (
    <>
      <Header
        title="Welcome back 👋"
        subtitle="Sign in and get started to track your finances."
      />

      <div className="w-full">
        <SignInForm />
      </div>

      <Link
        href="/recover-password"
        className="w-full text-end text-sm text-primary-500"
      >
        Forgot password?
      </Link>
      <div className="w-full text-center text-sm">
        <span className="font-thin">Don&apos;t have an account?</span>{" "}
        <PrimaryLink href="/sign-up">Sign up</PrimaryLink>
      </div>
    </>
  );
}
