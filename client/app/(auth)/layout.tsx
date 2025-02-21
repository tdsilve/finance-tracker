import { Grid } from "~/components/generic/grid";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid
      className="min-h-screen w-full px-4 lg:grid-cols-2 lg:p-2"
      cols={1}
      gap={12}
      col
      justify="center"
    >
      {children}
    </Grid>
  );
}
