import React from 'react'
import { Grid } from '../grid';

export const GridAbsoluteItemsCentered = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
   <Grid
         className="absolute right-0 top-0 z-40 h-screen w-screen bg-white"
         placeItems="center"
       >
         {children}
       </Grid>
  )
}
