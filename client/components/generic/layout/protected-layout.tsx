"use client";
import React from "react";
import { useMeQuery } from "~/api/query/useMeQuery";

import { Loading } from "../loading/loading";
import { useDebounce } from "~/hooks/useDebounce";
import { GridAbsoluteItemsCentered } from "~/components/generic/layout/grid-absolute-place-items-centered";

export const ProtectedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const me = useMeQuery();
  const debounce = useDebounce({ value: me.isLoading, delay: 500 });
  if (debounce)
    return (
      <GridAbsoluteItemsCentered>
        <Loading />
      </GridAbsoluteItemsCentered>
    );

  return <div>{children}</div>;
};
