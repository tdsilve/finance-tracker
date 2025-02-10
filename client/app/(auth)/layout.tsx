import { Grid } from "~/components/generic/Grid";
import { Logo } from "~/components/generic/Logo";
import { Flex } from "~/components/generic/Flex";

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
      <Grid className="hidden bg-primary-100  lg:grid " placeItems="center">
        <Logo width="400" height="400" />
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
    </Grid>
  );
}
