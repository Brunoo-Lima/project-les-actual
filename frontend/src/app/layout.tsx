import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import { Toaster } from 'sonner';
import { DataProvider } from '@/hooks/useData';
import { CheckoutProvider } from '@/hooks/useCheckout';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Página Inicial',
  description: 'Página Inicial do site',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.variable} ${roboto.className} antialiased`}>
        <AuthProvider>
          <CheckoutProvider>
            <DataProvider>
              {children}
              <Toaster richColors />
            </DataProvider>
          </CheckoutProvider>
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
