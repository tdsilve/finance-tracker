import { Header } from "~/components/generic/header/header";

import { ProtectedLayout } from "~/components/generic/layout/protected-layout";
import { Card } from "~/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedLayout>
      <Header />
      <main className="px-3 py-4 lg:px-14">
        <Card className="border-none drop-shadow-sm bg-white">{children}</Card>
      </main>
    </ProtectedLayout>
  );
}
