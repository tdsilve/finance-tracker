import { Header } from "~/components/generic/header/header";

import { ProtectedLayout } from "~/components/generic/layout/protected-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <Header />
      <main className="px-3 py-4 lg:px-14">{children}</main>
    </ProtectedLayout>
  );
}
