"use client";

import { Grid } from "~/components/generic/grid";

export default function Loading() {
  return (
    <Grid
      className="absolute right-0 top-0 z-40 h-screen w-screen bg-white"
      placeItems="center"
    >
      <div className="size-20 animate-spin rounded-full border-2 border-primary-200 border-t-transparent" />
    </Grid>
  );
}
