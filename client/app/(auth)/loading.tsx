"use client";

import { Grid } from "~/components/generic/Grid";

export default function Loading() {
  return (
    <Grid className="min-h-screen w-full" placeItems="center">
      <div className="animate-spin rounded-full h-20 w-20 border-2 border-primary-200 border-t-transparent" />
    </Grid>
  );
}
