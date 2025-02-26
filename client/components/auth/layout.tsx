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
        items="center"
        gap={4}
        className="m-auto w-full max-w-md  "
      >
      
        <div className=" text-center text-2xl font-bold text-primary-500 ">
          <Logo width="80" height="80" />
        </div>
  
        {children}

  
      </Flex>
     
    </>
  );
};
