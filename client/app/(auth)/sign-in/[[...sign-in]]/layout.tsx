import React from 'react'
import { Grid } from '~/components/generic/grid'
import { Flex } from '~/components/generic/flex'
import { Logo } from '~/components/generic/logo'
import Image from 'next/image'
import aux from "~/assets/images/gif/aux.gif"

export default function Layout ({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <>
    <Grid className="hidden bg-primary-100  lg:grid " placeItems="center">
        {/* <Image src={aux} alt="logo" width={400} height={400} /> */}
        {/* <Logo width="400" height="400" /> */}
      </Grid>
      <Flex
        col
        justify="center"
        gap={4}
        className="mx-auto w-full max-w-md lg:mx-0"
      >
        <div className="mx-auto text-center text-2xl font-bold text-primary-500 lg:hidden">
          <Logo width="80" height="80" />
        </div>
        {children}
      </Flex>
      </>

  )
}
