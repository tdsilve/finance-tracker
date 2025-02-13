import { Grid } from "~/components/generic/grid";
import { Logo } from "~/components/generic/logo";
import { Flex } from "~/components/generic/flex";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Grid
      className="min-h-screen w-full lg:grid-cols-2"
      cols={1}
      gap={12}
      col
      justify="center"
    >
      {children}
    </Grid>
  );
}
