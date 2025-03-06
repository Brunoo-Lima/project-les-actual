"use client";

import { AuthProvider } from "@/hooks/useAuth";
import { CheckoutProvider } from "@/hooks/useCheckout";
import { DataProvider } from "@/hooks/useData";
import { FilterProvider } from "@/hooks/useFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <FilterProvider>
            <CheckoutProvider>
              {children}
              <Toaster richColors />
            </CheckoutProvider>
          </FilterProvider>
        </DataProvider>
      </AuthProvider>

      <div id="modal-root" />
    </QueryClientProvider>
  );
};

export default Providers;
