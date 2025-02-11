import { Header } from "~/components/generic/header/header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main className="px-3 lg:px-14"> {children}</main>
    </div>
  );
}
