import React from "react";
import { CardHeader } from "~/components/ui/card";
import { CardTitle } from "~/components/ui/card";

export const MainLayout = ({
  children,
  title,
  headerContent,
}: Readonly<{
  children: React.ReactNode;
  title?: string;
  headerContent?: React.ReactNode;
}>) => {
  return (
    <div className="h-full">
      <CardHeader className="mx-auto -mt-24 size-full max-w-screen-2xl flex-wrap gap-y-2 md:flex-row md:items-center md:justify-between">
        <CardTitle>{title}</CardTitle> {headerContent}
      </CardHeader>
      {children}
    </div>
  );
};
