import React from "react";

import Image from "next/image";
import image from "~/assets/images/svg/image-3.png";
import { AuthLayout } from "~/components/auth/layout";

export default function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthLayout
      image={<Image src={image} alt="logo" width={500} height={500} />}
    >
      {children}
    </AuthLayout>
  );
}
