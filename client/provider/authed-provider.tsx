"use client";
import React from 'react'
import { useMeQuery } from '~/api/query/useMeQuery'

import { Loading } from '../components/generic/loading/loading';
import { useDebounce } from '~/hooks/useDebounce';
import { GridAbsoluteItemsCentered } from '~/components/generic/layout/grid-absolute-place-items-centered';

export const AuthedProvider = ({

    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const me = useMeQuery();
    const debounce = useDebounce({value: me.isLoading, delay: 1000});
// if (debounce)
if (true)
    return <GridAbsoluteItemsCentered><Loading/></GridAbsoluteItemsCentered> 

  return (
    <div>{children}</div>
  )
}
