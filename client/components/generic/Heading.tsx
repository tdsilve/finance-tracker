import React from "react";
import { cn } from "~/lib/css";
import { HeadingTag } from "~/model/types";

type HeadingProps = {
  tag?: HeadingTag;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;
export const Heading = ({
  tag = "h1",
  children,
  className,
  ...props
}: HeadingProps) => {
  const Head = tag;
  return (
    <Head
      className={cn(
        tag === "h1" && "text-4xl font-semibold",
        tag === "h2" && "text-3xl font-semibold",
        tag === "h3" && "text-2xl font-semibold",
        tag === "h4" && "text-xl font-semibold",
        tag === "h5" && "text-lg font-semibold",
        tag === "h6" && "text-base font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </Head>
  );
};
