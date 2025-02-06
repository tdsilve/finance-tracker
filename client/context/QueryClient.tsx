"use client";
import React from "react";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isNonRetryableStatus } from "~/lib/error";

const MAX_TRIES = 3;

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (failureCount > MAX_TRIES) return false;
          if (error) {
            {
              if (isNonRetryableStatus(error.status)) return false;
            }
            return false;
          }
          return true;
        },
      },
    },
  });

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
