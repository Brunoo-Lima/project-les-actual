import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { MasterLayout } from '@/components/master-layout/master-layout';

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
        {/* <MasterLayout> */}
        {children}
        {/* </MasterLayout> */}
      </body>
    </html>
  );
}
