"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RealtimeProvider } from "@upstash/realtime/client";
import { useState } from "react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  //right way to init tanstack query
  //on every render we are re genrating a query client and the reason is so it never gets stale across rerenders
  const [queryclient] = useState(() => new QueryClient());

  return (
    <RealtimeProvider>
      <QueryClientProvider client={queryclient}>{children}</QueryClientProvider>
    </RealtimeProvider>
  );
};
