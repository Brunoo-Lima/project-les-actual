import { Footer } from '@/components/footer/footer';
import { Header } from '@/components/header/header';

export function MasterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="h-screen min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
