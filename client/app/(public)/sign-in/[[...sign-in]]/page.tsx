import { SignInForm } from "~/components/auth/sign-in/SignInForm";
import Link from "next/link";
import { Header } from "~/components/auth/Header";

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

      <Link href="/" className="w-full text-end text-primary-500 text-sm">
        Forgot password?
      </Link>
      <div className="text-sm text-center w-full">
        <span className="font-thin">Don&apos;t have an account?</span>{" "}
        <Link href="/sign-up" className="font-bold text-primary-500">
          Sign up
        </Link>
      </div>
    </>
  );
}
