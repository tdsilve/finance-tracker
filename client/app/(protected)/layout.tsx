
import { Header } from "~/components/generic/header/header";

import { AuthedProvider } from "~/provider/authed-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthedProvider>

        <Header />
        <main className="px-3 py-4 lg:px-14">{children}</main>

      </AuthedProvider>
  );
}
