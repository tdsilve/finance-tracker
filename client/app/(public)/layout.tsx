import { Grid } from "~/components/generic/Grid";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid className="min-h-screen w-full lg:grid-cols-2" cols={1} col placeItems="center">
       {children}
    </Grid>
  );
}
