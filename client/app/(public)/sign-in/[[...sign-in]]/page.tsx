import { SignInMainImage } from "~/components/auth/sign-in/SignInMainImage";

export default function SignInPage() {
  return (
    <>
   <div className="hidden lg:block border">
      <SignInMainImage />
   </div>
   <div className="border">
      sign in
   </div>
   </>
  );
}
