import type { Metadata } from "next";

import "./globals.css";
import { QueryProvider } from "~/provider/query-provider";
import { Toaster } from "react-hot-toast";

import { SheetProvider } from "~/provider/sheet-provider";

export const metadata: Metadata = {
  title: "Finance Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased"}>
        <QueryProvider>
          <Toaster position="top-center" />
          {children}
          <SheetProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
