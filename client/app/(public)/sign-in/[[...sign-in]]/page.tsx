import { SignInMainImage } from "~/components/auth/sign-in/SignInMainImage";
import { SignInForm } from "~/components/auth/sign-in/SignInForm";
import { Heading } from "~/components/generic/Heading";
import { Logo } from "~/components/generic/Logo";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <div className="hidden lg:block">
        <SignInMainImage />
      </div>
      <div>
        <div className="text-center">
          <div className="mx-auto w-fit"> <Logo/></div>
         
          <Heading tag="h2">Welcome back</Heading>
          
          <p className="font-thin">
            Login or create an account to access your dashboard
          </p>
        </div>
        <SignInForm />
        <div className="text-sm text-center w-full"><span className="font-thin">Don't have an account?</span> <Link href="/sign-up" className="font-bold text-primary-500">Sign up</Link></div>
      </div>
    </>
  );
}
