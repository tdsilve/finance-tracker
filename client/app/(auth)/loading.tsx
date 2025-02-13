"use client";

import { Grid } from "~/components/generic/grid";

export default function Loading() {
  return (
    <Grid
      className="absolute right-0 top-0 z-40 h-screen w-screen bg-white"
      placeItems="center"
    >
      <Loading />
    </Grid>
  );
}
