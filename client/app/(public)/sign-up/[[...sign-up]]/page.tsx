import { SignUpForm } from "~/components/auth/sign-up/SignUpForm";

import Link from "next/link";

import { Header } from "~/components/auth/Header";

export default function SignUpPage() {
  return (
    <>
      <Header title="Welcome" subtitle="Sign up to track your finances." />

      <div className="w-full">
        <SignUpForm />
      </div>

      <div className="text-sm text-center w-full">
        <span className="font-thin">Already have an account?</span>{" "}
        <Link href="/sign-in" className="font-bold text-primary-500">
          Sign in
        </Link>
      </div>
    </>
  );
}
