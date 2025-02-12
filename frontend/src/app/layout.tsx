import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import { DataProvider } from "@/hooks/useData";
import { CheckoutProvider } from "@/hooks/useCheckout";
import { FilterProvider } from "@/hooks/useFilter";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Página Inicial",
  description: "Página Inicial do site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={` ${roboto.className} ${roboto.variable} antialiased`}>
        <AuthProvider>
          <FilterProvider>
            <CheckoutProvider>
              <DataProvider>
                {children}
                <Toaster richColors />
              </DataProvider>
            </CheckoutProvider>
          </FilterProvider>
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
