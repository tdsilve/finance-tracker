"use client";

import { Grid } from "~/components/generic/grid";

export default function Loading() {
  return (
    <Grid className="min-h-screen w-full" placeItems="center">
      <div className="size-20 animate-spin rounded-full border-2 border-primary-200 border-t-transparent" />
    </Grid>
  );
}
