import React from "react";
import { Grid } from "~/components/generic/grid";
import { Logo } from "~/components/generic/logo";
import { Flex } from "~/components/generic/flex";

type AuthLayoutProps = {
  image: React.ReactNode;
  children: React.ReactNode;
};

export const AuthLayout = ({ image, children }: AuthLayoutProps) => {
  return (
    <>
      <Grid className="hidden bg-primary-100  lg:grid " placeItems="center">
        {image}
      </Grid>
      <Flex
        col
        justify="center"
        gap={4}
        className="mx-auto w-full max-w-md lg:mx-0"
      >
        <div className="mx-auto text-center text-2xl font-bold text-primary-500 ">
          <Logo width="80" height="80" />
        </div>
        {children}
      </Flex>
    </>
  );
};
