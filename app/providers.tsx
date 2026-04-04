"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Hum retry ko function bana rahe hain
            retry: (failureCount, error: any) => {
              // 1. Agar 404 (Not Found) ya 401 (Unauthorized) hai toh retry mat karo
              const status = error?.response?.status || error?.status;
              if (status === 404 || status === 401) {
                return false;
              }

              // 2. Sirf 2 baar retry karo agar koi aur error hai (e.g. 500 ya Network Down)
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5, // 5 min cache
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
