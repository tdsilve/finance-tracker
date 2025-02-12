"use client";

import { Grid } from "~/components/generic/grid";

export default function Loading() {
  return (
    <Grid className="h-screen w-screen absolute z-40 top-0 right-0 bg-white" placeItems="center">
      <div className="size-20 animate-spin rounded-full border-2 border-primary-200 border-t-transparent" />
    </Grid>
  );
}
